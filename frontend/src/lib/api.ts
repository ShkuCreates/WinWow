const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type CryptoCurrency = 'USDT' | 'BTC' | 'ETH' | 'LTC';

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface OrderResponse {
  id: string;
  productId: string;
  productName: string;
  fullPriceUsd: number;
  depositPercentage: number;
  depositUsd: number;
  crypto: CryptoCurrency;
  expectedCryptoAmount: number;
  formattedCryptoAmount: string;
  sellerAddress: string;
  status: 'pending' | 'paid' | 'expired';
  createdAt: number;
  expiresAt: number;
  paidAt?: number;
  txHash?: string;
}

async function parseJson<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as { message?: string }).message || 'Request failed');
  }
  return data as T;
}

export async function createOrder(input: {
  productId: string;
  productName: string;
  fullPriceUsd: number;
  depositPercentage: number;
  crypto: CryptoCurrency;
  customer: CustomerInfo;
}): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...input,
      customer: {
        name: input.customer.name,
        email: input.customer.email,
        address: input.customer.address,
        phone: input.customer.phone || undefined,
      },
    }),
  });

  const data = await parseJson<{ order: OrderResponse }>(response);
  return data.order;
}

export async function verifyOrderPayment(orderId: string): Promise<{
  status: 'pending' | 'paid' | 'expired';
  txHash?: string;
  paidAt?: number;
  message?: string;
}> {
  const response = await fetch(`${API_URL}/api/orders/${orderId}/verify`, {
    method: 'POST',
  });

  if (response.status === 410) {
    return { status: 'expired', message: 'Order expired' };
  }

  return parseJson(response);
}
