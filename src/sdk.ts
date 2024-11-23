import {
	type ListingsInfoParams,
	type ListingsQuotesParams,
	type NetworksListParams,
	type PairsQuotesLatestParams,
	type SpotPairsLatestParams,
} from "./params";
import {
	type ListingsInfoResponse,
	type ListingsQuotesResponse,
	type NetworksListResponse,
	type SpotPairsLatestResponse,
} from "./responses";

interface APIConstructor {
	apiKey: string;
	baseUrl?: string;
}

export class CoinMarketCapDexSDK {
	private apiKey: string;
	private baseUrl: string;

	constructor(data: APIConstructor) {
		console.log("Saving API key", data.apiKey);
		this.apiKey = data.apiKey;
		this.baseUrl = data.baseUrl ?? "https://pro-api.coinmarketcap.com";
	}

	private async fetch<T>(
		endpoint: string,
		params: Record<string, any> = {}
	): Promise<T> {
		const url = new URL(endpoint, this.baseUrl);

		// Append query parameters
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		});

		console.log("About to fetch", url.toString());
		console.log("With api key", this.apiKey);
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"X-CMC_PRO_API_KEY": this.apiKey,
				Accept: "*/*",
			},
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.statusText}`);
		}

		return response.json() as Promise<T>;
	}

	// Get latest spot pairs
	async getSpotPairsLatest(
		params: SpotPairsLatestParams
	): Promise<SpotPairsLatestResponse> {
		return this.fetch<SpotPairsLatestResponse>(
			"/v4/dex/spot-pairs/latest",
			params
		);
	}

	// Get latest spot pairs with pagination
	async getSpotPairsLatestWithPagination(
		params: SpotPairsLatestParams,
		onPageReceived: (data: any) => void,
		maxPages: number = 10
	): Promise<void> {
		let currentScrollId: string | undefined = params.scroll_id;
		let currentPage = 0;

		while (currentPage < maxPages) {
			const response = await this.fetch<SpotPairsLatestResponse>(
				"/v4/dex/spot-pairs/latest",
				{
					...params,
					scroll_id: currentScrollId,
				}
			);

			// Call the callback with the current page's data
			onPageReceived(response);

			// Check if a new scroll_id is provided for further pagination
			currentScrollId = response.data[-1]?.scroll_id;
			if (!response.data || !response.data.length || !currentScrollId) {
				break; // No more data to paginate through
			}

			currentPage++;
		}
	}

	// Get latest pairs quotes
	async getPairsQuotesLatest(params: PairsQuotesLatestParams): Promise<any> {
		return this.fetch("/v4/dex/pairs/quotes/latest", params);
	}

	// Fetch latest listings of DEXes
	async getListingsQuotes(
		params: ListingsQuotesParams
	): Promise<ListingsQuotesResponse> {
		return this.fetch<ListingsQuotesResponse>(
			"/v4/dex/listings/quotes",
			params
		);
	}

	// Fetch metadata for DEXes
	async getListingsInfo(
		params: ListingsInfoParams
	): Promise<ListingsInfoResponse> {
		return this.fetch<ListingsInfoResponse>("/v4/dex/listings/info", params);
	}

	// Fetch all networks on CMC
	async getNetworksList(
		params: NetworksListParams
	): Promise<NetworksListResponse> {
		return this.fetch<NetworksListResponse>("/v4/dex/networks/list", params);
	}
}

// // Example Usage
// const api = new CoinMarketCapDexSDK({
// 	apiKey: "your_api_key_here",
// 	// baseUrl: 'https://pro-api.coinmarketcap.com', // Optional
// });

// // Fetch latest dex spot pairs
// api
// 	.getSpotPairsLatest({
// 		network_id: 25,
// 		dex_slug: "uniswap-v3-polygon,quickswap-v3,curve-polygon",
// 		base_asset_symbol: "USDT",
// 		sort: "volume_24h",
// 		sort_dir: "asc",
// 	})
// 	.then((data) => console.log(data))
// 	.catch((error) => console.error(error));

// // Fetch latest dex pairs quotes
// api
// 	.getPairsQuotesLatest({
// 		contract_address:
// 			"0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640,0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8",
// 		skip_invalid: true,
// 	})
// 	.then((data) => console.log(data))
// 	.catch((error) => console.error(error));
