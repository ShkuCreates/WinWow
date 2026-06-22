import { CryptoCurrency, SELLER_ADDRESSES, USDT_CONTRACT } from '../config/crypto';
import { Order } from './orderStore';

export interface PaymentMatch {
  found: boolean;
  txHash?: string;
  amount?: number;
}

const AMOUNT_TOLERANCE = 0.02; // 2% tolerance for network fees / rounding
const REQUEST_TIMEOUT_MS = 10000;

function meetsMinimum(received: number, expected: number): boolean {
  return received >= expected * (1 - AMOUNT_TOLERANCE);
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      console.warn(`Payment verification endpoint returned ${response.status} for ${url}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`Payment verification fetch failed for ${url}:`, error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyBtcPayment(order: Order): Promise<PaymentMatch> {
  const address = SELLER_ADDRESSES.BTC;
  const txs = await fetchJson<Array<{
    txid: string;
    status: { confirmed: boolean; block_time?: number };
    vout: Array<{ scriptpubkey_address?: string; value: number }>;
  }>>(`https://mempool.space/api/address/${address}/txs`);

  if (!txs) return { found: false };

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

  const data = await fetchJson<{
    status: string;
    result: Array<{ hash: string; to: string; value: string; timeStamp: string }>;
  }>(url);

  if (!data || data.status !== '1' || !Array.isArray(data.result)) return { found: false };

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

  const data = await fetchJson<{
    status: string;
    result: Array<{ hash: string; to: string; value: string; timeStamp: string }>;
  }>(url);

  if (!data || data.status !== '1' || !Array.isArray(data.result)) return { found: false };

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
  const data = await fetchJson<{
    status: string;
    data: {
      txs: Array<{ txid: string; value: string; time: number }>;
    };
  }>(`https://chain.so/api/v2/get_tx_received/LTC/${address}`);

  if (!data || data.status !== 'success' || !data.data?.txs) return { found: false };

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
