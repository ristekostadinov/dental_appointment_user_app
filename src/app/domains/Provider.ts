export interface Provider {
  id: number;
  name: string;
  address: string;
  description: string;
}

export interface ProviderResponse {
  provider: Provider;
  price: number;
}