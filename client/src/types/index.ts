export interface SearchParams {
  query: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  radius?: number;
  sortBy?: string;
}

export interface MarketplaceItem {
  id: string | number;
  title: string;
  price: string;
  image?: string;
  link?: string;
}

export interface SearchResponse {
  success: boolean;
  count: number;
  data: MarketplaceItem[];
  searchParams: SearchParams;
  error?: string;
  message?: string;
}