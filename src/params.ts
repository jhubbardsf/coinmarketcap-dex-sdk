export interface ListingsQuotesParams {
  start?: number; // Pagination offset
  limit?: number; // Number of results to return
  sort?: 'name' | 'volume_24h' | 'market_share' | 'num_markets'; // Sort field
  sort_dir?: 'asc' | 'desc'; // Sort direction
  type?: 'all' | 'orderbook' | 'swap' | 'aggregator'; // Category of exchange
  aux?: 'date_launched'; // Supplemental fields to return
  convert_id?: string; // Comma-separated list of cryptocurrency or fiat IDs
}

export interface ListingsInfoParams {
  id: string; // One or more comma-separated exchange IDs
  aux?: 'urls' | 'logo' | 'description' | 'date_launched' | 'notice'; // Supplemental fields
}

export interface NetworksListParams {
  start?: number; // Pagination offset
  limit?: number; // Number of results to return
  sort?: 'id' | 'name'; // Sort field
  sort_dir?: 'asc' | 'desc'; // Sort direction
  aux?: string; // Supplemental fields
}

export interface SpotPairsLatestParams {
  network_id?: number; // One or more comma-separated network IDs
  network_slug?: string; // Comma-separated network slugs
  dex_id?: string; // One or more comma-separated dex IDs
  dex_slug?: string; // Comma-separated dex slugs
  base_asset_id?: string; // Comma-separated base asset IDs
  base_asset_symbol?: string; // Comma-separated base asset symbols
  base_asset_contract_address?: string; // Base asset contract address
  base_asset_ucid?: string; // Comma-separated base asset UCIDs
  quote_asset_id?: string; // Comma-separated quote asset IDs
  quote_asset_symbol?: string; // Comma-separated quote asset symbols
  quote_asset_contract_address?: string; // Quote asset contract address
  quote_asset_ucid?: string; // Comma-separated quote asset UCIDs
  scroll_id?: string; // Scroll ID for pagination
  limit?: number; // Results limit, default = 50
  price_min?: number; // Minimum price filter
  price_max?: number; // Maximum price filter
  liquidity_min?: number; // Minimum liquidity filter
  liquidity_max?: number; // Maximum liquidity filter
  volume_24h_min?: number; // Minimum 24-hour volume filter
  volume_24h_max?: number; // Maximum 24-hour volume filter
  fully_diluted_value_min?: number; // Minimum fully diluted value filter
  fully_diluted_value_max?: number; // Maximum fully diluted value filter
  no_of_transactions_24h_min?: number; // Minimum 24-hour transactions filter
  no_of_transactions_24h_max?: number; // Maximum 24-hour transactions filter
  percent_change_24h_min?: number; // Minimum 24-hour percent change filter
  percent_change_24h_max?: number; // Maximum 24-hour percent change filter
  sort?: 'volume_24h' | 'percent_change_24h' | 'liquidity' | 'no_of_transactions_24h'; // Sort field
  sort_dir?: 'asc' | 'desc'; // Sort direction
  aux?: string; // Supplemental data fields
  convert_id?: string; // Market quotes in additional currencies
  reverse_order?: boolean; // Invert the order of the trading pair
}

export interface PairsQuotesLatestParams {
  contract_address?: string; // Comma-separated contract addresses
  network_id?: number; // Network ID
  network_slug?: string; // Network slug
  aux?: string; // Supplemental data fields
  convert_id?: string; // Market quotes in additional currencies
  skip_invalid?: boolean; // Skip invalid lookups
  reverse_order?: boolean; // Reverse the order of the trading pair
}
