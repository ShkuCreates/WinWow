import { CryptoCurrency } from '../config/crypto';

const COINGECKO_IDS: Record<CryptoCurrency, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  LTC: 'litecoin',
};

const priceCache: { rates: Record<CryptoCurrency, number>; fetchedAt: number } = {
  rates: { BTC: 0, ETH: 0, USDT: 1, LTC: 0 },
  fetchedAt: 0,
};

const CACHE_TTL_MS = 60 * 1000;

export async function getUsdRates(): Promise<Record<CryptoCurrency, number>> {
  const now = Date.now();
  if (now - priceCache.fetchedAt < CACHE_TTL_MS && priceCache.rates.BTC > 0) {
    return priceCache.rates;
  }

  const ids = Object.values(COINGECKO_IDS).join(',');
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch crypto prices');
  }

  const data = (await response.json()) as Record<string, { usd: number }>;

  priceCache.rates = {
    BTC: data[COINGECKO_IDS.BTC]?.usd ?? priceCache.rates.BTC,
    ETH: data[COINGECKO_IDS.ETH]?.usd ?? priceCache.rates.ETH,
    USDT: data[COINGECKO_IDS.USDT]?.usd ?? 1,
    LTC: data[COINGECKO_IDS.LTC]?.usd ?? priceCache.rates.LTC,
  };
  priceCache.fetchedAt = now;

  return priceCache.rates;
}

export async function usdToCrypto(usdAmount: number, crypto: CryptoCurrency): Promise<number> {
  const rates = await getUsdRates();
  const rate = rates[crypto];
  if (!rate || rate <= 0) {
    throw new Error(`Missing exchange rate for ${crypto}`);
  }
  return usdAmount / rate;
}

export function formatCryptoAmount(amount: number, crypto: CryptoCurrency): string {
  const decimals = crypto === 'BTC' || crypto === 'LTC' ? 8 : crypto === 'ETH' ? 6 : 2;
  return amount.toFixed(decimals);
}
