export interface Provider {
  id: number;
  name: string;
  address: string;
  description: string;
  price: number;
}

export interface ProviderResponse {
  provider: Provider;
  price: number;
}