import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { ORDER_SESSION_TTL_MS } from '../config/crypto';
import { CryptoCurrency } from '../config/crypto';
import { formatCryptoAmount, usdToCrypto } from '../services/cryptoPrices';
import { getOrder, markOrderPaid, saveOrder } from '../services/orderStore';
import { getSellerAddress, verifyPayment } from '../services/paymentVerifier';

const router = Router();

function generateOrderId(): string {
  return `WW-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

router.post(
  '/',
  [
    body('productId').isString().notEmpty(),
    body('productName').isString().notEmpty(),
    body('fullPriceUsd').isFloat({ min: 0 }),
    body('depositPercentage').isFloat({ min: 1, max: 100 }),
    body('crypto').isIn(['USDT', 'BTC', 'ETH', 'LTC']),
    body('customer.name').isString().notEmpty(),
    body('customer.email').isEmail(),
    body('customer.address').isString().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        productId,
        productName,
        fullPriceUsd,
        depositPercentage,
        crypto,
        customer,
      } = req.body as {
        productId: string;
        productName: string;
        fullPriceUsd: number;
        depositPercentage: number;
        crypto: CryptoCurrency;
        customer: { name: string; email: string; address: string; phone?: string };
      };

      const baseDeposit = fullPriceUsd * (depositPercentage / 100);
      // Small unique offset (1–9 cents) so each order has a distinct expected amount
      const uniqueOffset = (Math.floor(Math.random() * 9) + 1) / 100;
      const depositUsd = Math.round((baseDeposit + uniqueOffset) * 100) / 100;

      const expectedCryptoAmount = await usdToCrypto(depositUsd, crypto);
      const now = Date.now();

      const order = {
        id: generateOrderId(),
        productId,
        productName,
        fullPriceUsd,
        depositPercentage,
        depositUsd,
        crypto,
        expectedCryptoAmount,
        cryptoSymbol: crypto,
        customer,
        status: 'pending' as const,
        createdAt: now,
        expiresAt: now + ORDER_SESSION_TTL_MS,
      };

      saveOrder(order);

      return res.status(201).json({
        order: {
          id: order.id,
          productId: order.productId,
          productName: order.productName,
          fullPriceUsd: order.fullPriceUsd,
          depositPercentage: order.depositPercentage,
          depositUsd: order.depositUsd,
          crypto: order.crypto,
          expectedCryptoAmount: order.expectedCryptoAmount,
          formattedCryptoAmount: formatCryptoAmount(order.expectedCryptoAmount, crypto),
          sellerAddress: getSellerAddress(crypto),
          status: order.status,
          createdAt: order.createdAt,
          expiresAt: order.expiresAt,
        },
      });
    } catch (error) {
      console.error('Create order error:', error);
      return res.status(500).json({ message: 'Failed to create order session' });
    }
  }
);

router.get('/:id', param('id').isString(), (req: Request, res: Response) => {
  const order = getOrder(req.params.id as string);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.json({
    order: {
      id: order.id,
      productId: order.productId,
      productName: order.productName,
      fullPriceUsd: order.fullPriceUsd,
      depositPercentage: order.depositPercentage,
      depositUsd: order.depositUsd,
      crypto: order.crypto,
      expectedCryptoAmount: order.expectedCryptoAmount,
      formattedCryptoAmount: formatCryptoAmount(order.expectedCryptoAmount, order.crypto),
      sellerAddress: getSellerAddress(order.crypto),
      status: order.status,
      createdAt: order.createdAt,
      expiresAt: order.expiresAt,
      paidAt: order.paidAt,
      txHash: order.txHash,
    },
  });
});

router.post('/:id/verify', param('id').isString(), async (req: Request, res: Response) => {
  const order = getOrder(req.params.id as string);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.status === 'expired') {
    return res.status(410).json({ message: 'Order session expired', status: 'expired' });
  }

  if (order.status === 'paid') {
    return res.json({
      status: 'paid',
      txHash: order.txHash,
      paidAt: order.paidAt,
    });
  }

  try {
    const match = await verifyPayment(order);

    if (match.found && match.txHash) {
      const paidOrder = markOrderPaid(order.id, match.txHash);
      return res.json({
        status: 'paid',
        txHash: paidOrder?.txHash,
        paidAt: paidOrder?.paidAt,
        receivedAmount: match.amount,
      });
    }

    return res.json({
      status: 'pending',
      message: 'Payment not detected yet. Send the exact amount and try again in a few minutes.',
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({ message: 'Failed to verify payment on blockchain' });
  }
});

export default router;
