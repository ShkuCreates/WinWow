import { CryptoCurrency, SELLER_ADDRESSES, USDT_CONTRACT } from '../config/crypto';
import { Order } from './orderStore';

export interface PaymentMatch {
  found: boolean;
  txHash?: string;
  amount?: number;
}

const AMOUNT_TOLERANCE = 0.02; // 2% tolerance for network fees / rounding

function meetsMinimum(received: number, expected: number): boolean {
  return received >= expected * (1 - AMOUNT_TOLERANCE);
}

async function verifyBtcPayment(order: Order): Promise<PaymentMatch> {
  const address = SELLER_ADDRESSES.BTC;
  const response = await fetch(`https://mempool.space/api/address/${address}/txs`);
  if (!response.ok) return { found: false };

  const txs = (await response.json()) as Array<{
    txid: string;
    status: { confirmed: boolean; block_time?: number };
    vout: Array<{ scriptpubkey_address?: string; value: number }>;
  }>;

  const orderStartSec = Math.floor(order.createdAt / 1000);

  for (const tx of txs) {
    const txTime = tx.status.block_time;
    if (!txTime || txTime < orderStartSec) continue;

    const received =
      tx.vout
        .filter((output) => output.scriptpubkey_address === address)
        .reduce((sum, output) => sum + output.value, 0) / 1e8;

    if (meetsMinimum(received, order.expectedCryptoAmount)) {
      return { found: true, txHash: tx.txid, amount: received };
    }
  }

  return { found: false };
}

async function verifyEthPayment(order: Order): Promise<PaymentMatch> {
  const address = SELLER_ADDRESSES.ETH;
  const apiKey = process.env.ETHERSCAN_API_KEY ?? '';
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc${apiKey ? `&apikey=${apiKey}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) return { found: false };

  const data = (await response.json()) as {
    status: string;
    result: Array<{ hash: string; to: string; value: string; timeStamp: string }>;
  };

  if (data.status !== '1' || !Array.isArray(data.result)) return { found: false };

  const orderStartSec = Math.floor(order.createdAt / 1000);

  for (const tx of data.result) {
    if (tx.to.toLowerCase() !== address.toLowerCase()) continue;
    if (Number(tx.timeStamp) < orderStartSec) continue;

    const received = Number(tx.value) / 1e18;
    if (meetsMinimum(received, order.expectedCryptoAmount)) {
      return { found: true, txHash: tx.hash, amount: received };
    }
  }

  return { found: false };
}

async function verifyUsdtPayment(order: Order): Promise<PaymentMatch> {
  const address = SELLER_ADDRESSES.USDT;
  const apiKey = process.env.ETHERSCAN_API_KEY ?? '';
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${USDT_CONTRACT}&address=${address}&startblock=0&endblock=99999999&sort=desc${apiKey ? `&apikey=${apiKey}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) return { found: false };

  const data = (await response.json()) as {
    status: string;
    result: Array<{ hash: string; to: string; value: string; timeStamp: string }>;
  };

  if (data.status !== '1' || !Array.isArray(data.result)) return { found: false };

  const orderStartSec = Math.floor(order.createdAt / 1000);

  for (const tx of data.result) {
    if (tx.to.toLowerCase() !== address.toLowerCase()) continue;
    if (Number(tx.timeStamp) < orderStartSec) continue;

    const received = Number(tx.value) / 1e6;
    if (meetsMinimum(received, order.expectedCryptoAmount)) {
      return { found: true, txHash: tx.hash, amount: received };
    }
  }

  return { found: false };
}

async function verifyLtcPayment(order: Order): Promise<PaymentMatch> {
  const address = SELLER_ADDRESSES.LTC;
  const response = await fetch(`https://chain.so/api/v2/get_tx_received/LTC/${address}`);
  if (!response.ok) return { found: false };

  const data = (await response.json()) as {
    status: string;
    data: {
      txs: Array<{ txid: string; value: string; time: number }>;
    };
  };

  if (data.status !== 'success' || !data.data?.txs) return { found: false };

  const orderStartSec = Math.floor(order.createdAt / 1000);

  for (const tx of data.data.txs) {
    if (tx.time < orderStartSec) continue;

    const received = parseFloat(tx.value);
    if (meetsMinimum(received, order.expectedCryptoAmount)) {
      return { found: true, txHash: tx.txid, amount: received };
    }
  }

  return { found: false };
}

export async function verifyPayment(order: Order): Promise<PaymentMatch> {
  switch (order.crypto) {
    case 'BTC':
      return verifyBtcPayment(order);
    case 'ETH':
      return verifyEthPayment(order);
    case 'USDT':
      return verifyUsdtPayment(order);
    case 'LTC':
      return verifyLtcPayment(order);
    default:
      return { found: false };
  }
}

export function getSellerAddress(crypto: CryptoCurrency): string {
  return SELLER_ADDRESSES[crypto];
}
