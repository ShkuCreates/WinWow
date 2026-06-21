export const SELLER_ADDRESSES = {
  USDT: '0xF082C66009e8467C99d9ef03183820ad244F129B',
  BTC: 'bc1qry6ltzu4hk2euunmm4uq6n89f34sz9j3k283hz',
  ETH: '0xF082C66009e8467C99d9ef03183820ad244F129B',
  LTC: 'LZswPU7o7Spwih9P7mb99iD6v9aL1Zc1aD',
} as const;

export const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

export const ORDER_SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

export type CryptoCurrency = keyof typeof SELLER_ADDRESSES;
