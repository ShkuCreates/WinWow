import { CryptoCurrency } from '../config/crypto';

export interface OrderCustomer {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  fullPriceUsd: number;
  depositPercentage: number;
  depositUsd: number;
  crypto: CryptoCurrency;
  expectedCryptoAmount: number;
  cryptoSymbol: string;
  customer: OrderCustomer;
  status: 'pending' | 'paid' | 'expired';
  createdAt: number;
  expiresAt: number;
  paidAt?: number;
  txHash?: string;
}

const orders = new Map<string, Order>();

export function saveOrder(order: Order): void {
  orders.set(order.id, order);
}

export function getOrder(id: string): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;

  if (order.status === 'pending' && Date.now() > order.expiresAt) {
    order.status = 'expired';
    orders.set(id, order);
  }

  return order;
}

export function markOrderPaid(id: string, txHash: string): Order | undefined {
  const order = getOrder(id);
  if (!order || order.status !== 'pending') return order;

  order.status = 'paid';
  order.paidAt = Date.now();
  order.txHash = txHash;
  orders.set(id, order);
  return order;
}

export function cleanupExpiredOrders(): void {
  const now = Date.now();
  for (const [id, order] of orders.entries()) {
    if (order.status === 'pending' && now > order.expiresAt) {
      order.status = 'expired';
      orders.set(id, order);
    }
    if (order.status === 'expired' && now - order.expiresAt > 24 * 60 * 60 * 1000) {
      orders.delete(id);
    }
  }
}

setInterval(cleanupExpiredOrders, 5 * 60 * 1000);
