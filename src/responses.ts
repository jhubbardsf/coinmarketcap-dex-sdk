// Spot Pairs Latest Return Type
export interface SpotPairsLatestResponse {
  data: SpotPair[];
  status: Status;
}

export interface SpotPair {
  quote: SpotPairQuote[];
  scroll_id: string;
  contract_address: string;
  name: string;
  base_asset_id: string;
  base_asset_ucid: string | null;
  base_asset_name: string;
  base_asset_symbol: string;
  base_asset_contract_address: string;
  quote_asset_id: string;
  quote_asset_ucid: string | null;
  quote_asset_name: string;
  quote_asset_symbol: string;
  quote_asset_contract_address: string;
  dex_id: string;
  dex_slug: string;
  network_id: string;
  network_slug: string;
  last_updated: string; // ISO 8601 timestamp
  created_at: string; // ISO 8601 timestamp
}

export interface SpotPairQuote {
  convert_id: string;
  price: number;
  price_by_quote_asset: number;
  last_updated: string; // ISO 8601 timestamp
  volume_24h: number;
  percent_change_price_1h: number;
  percent_change_price_24h: number;
  liquidity: number;
  fully_diluted_value: number;
}

// Listing Quotes Return Type
export interface ListingsQuotesResponse {
  data: ListingsQuote[];
  status: Status;
}

export interface ListingsQuote {
  num_market_pairs: string;
  last_updated: string; // ISO 8601 timestamp
  market_share: number;
  type: string;
  quote: ListingsQuoteDetail[];
  id: number;
  name: string;
  slug: string;
  status: string;
}

export interface ListingsQuoteDetail {
  convert_id: string;
  market_type: string;
  last_updated: string; // ISO 8601 timestamp
  volume_24h: number;
  percent_change_volume_24h: number;
  num_transactions_24h: number;
}

// Listing Info Return Type
export interface ListingsInfoResponse {
  data: ListingInfo[];
  status: Status;
}

export interface ListingInfo {
  id: number;
  name: string;
  slug: string;
  date_launched: string; // ISO 8601 timestamp
  logo: string; // URL to the logo
  status: string;
  description: string | null;
  notice: string;
  urls: ListingUrls;
}

export interface ListingUrls {
  website: string[];
  blog: string[];
  chat: string[];
  fee: string[];
  twitter: string[];
}

// Network List Return Type
export interface NetworksListResponse {
  data: Network[];
  status: Status;
}

export interface Network {
  id: number;
  name: string;
  network_slug: string;
}

// Common Types
export interface Status {
  timestamp: string; // ISO 8601 timestamp
  error_code: string;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
}
