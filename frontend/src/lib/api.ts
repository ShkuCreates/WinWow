const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000');

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

async function safeFetch<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(
      `Unable to reach backend at ${url}. Make sure the backend server is running and the API is reachable.`
    );
  }

  return parseJson<T>(response);
}

export async function createOrder(input: {
  productId: string;
  productName: string;
  fullPriceUsd: number;
  depositPercentage: number;
  crypto: CryptoCurrency;
  customer: CustomerInfo;
}): Promise<OrderResponse> {
  const data = await safeFetch<{ order: OrderResponse }>(`${API_URL}/api/orders`, {
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

  return data.order;
}

export async function verifyOrderPayment(orderId: string): Promise<{
  status: 'pending' | 'paid' | 'expired';
  txHash?: string;
  paidAt?: number;
  message?: string;
}> {
  if (!orderId) {
    throw new Error('Order ID is missing. Please try again from the pre-book page.');
  }

  const response = await safeFetch<{ status: 'pending' | 'paid' | 'expired'; txHash?: string; paidAt?: number; message?: string }>(
    `${API_URL}/api/orders/${orderId}/verify`,
    {
      method: 'POST',
    }
  );

  return response;
}
