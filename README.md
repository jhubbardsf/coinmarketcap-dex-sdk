# CoinMarketCap DEX SDK

A TypeScript SDK for interacting with the CoinMarketCap DEX API. This SDK
simplifies communication with the CoinMarketCap Pro API to fetch data about
decentralized exchanges, spot pairs, pair quotes, networks, and more.

This is a unofficial SDK for the [DEX
API](https://coinmarketcap.com/academy/article/dex-apis-soft-launch-unveiling-coinmarketcaps-first-dex-api-suite)
on CoinMarketCap. Most of this is being ported from an exported [Postman
Collection
(Official)](https://www.postman.com/bryancmc/workspace/coinmarketcap-dex-apis/collection/27765301-3b01b3d6-9934-4e39-b770-92536a0932bd?action=share&creator=27765301).
This is a personal project I'm using and figured it might be helpful to others.
Not all the endpoints are implemented yet. Feel free to PR.

## Features

- Fetch the latest spot pairs on DEXes.
- Get the latest quotes for specific pairs.
- Retrieve listings and metadata for decentralized exchanges.
- Fetch a list of networks supported on CoinMarketCap.
- Easy-to-use interface for integrating CoinMarketCap's DEX API.

## Installation

Install the SDK using npm or yarn:

```bash
npm install coinmarketcap-dex-sdk
# or
yarn add coinmarketcap-dex-sdk
```

## Getting Started

### Import and Initialize the SDK

```typescript
import { CoinMarketCapDexSDK } from "coinmarketcap-dex-sdk";

const api = new CoinMarketCapDexSDK({
  apiKey: "your_api_key_here", // Your CoinMarketCap API key
  // baseUrl: 'https://pro-api.coinmarketcap.com', // Optional, defaults to CoinMarketCap's API URL
});
```

### Example Usage

#### Fetch Latest Spot Pairs
Retrieve the latest spot pairs on supported DEXes.

```typescript
api
  .getSpotPairsLatest({
    network_id: 25,
    dex_slug: "uniswap-v3-polygon,quickswap-v3,curve-polygon",
    base_asset_symbol: "USDT",
    sort: "volume_24h",
    sort_dir: "asc",
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

#### Fetch Latest Pair Quotes
Retrieve the latest quotes for specific pairs.

```typescript
api
  .getPairsQuotesLatest({
    contract_address: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640,0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8",
    skip_invalid: true,
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

#### Fetch DEX Listings and Metadata
Retrieve listings or metadata for decentralized exchanges.

```typescript
api
  .getListingsInfo({ slug: "uniswap-v3-polygon" })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

#### Fetch Networks List
Retrieve the list of networks supported on CoinMarketCap.

```typescript
api
  .getNetworksList({})
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Parameters and Responses

- **Params**: Types for request parameters are defined in the `params` module:
  - `ListingsInfoParams`
  - `ListingsQuotesParams`
  - `NetworksListParams`
  - `PairsQuotesLatestParams`
  - `SpotPairsLatestParams`

- **Responses**: Types for API responses are defined in the `responses` module:
  - `ListingsInfoResponse`
  - `ListingsQuotesResponse`
  - `NetworksListResponse`
  - `SpotPairsLatestResponse`

### Constructor Options

The SDK requires an API key for authentication and optionally allows setting a custom base URL.

| Parameter   | Type     | Required | Default                                | Description                  |
|-------------|----------|----------|----------------------------------------|------------------------------|
| `apiKey`    | `string` | Yes      | -                                      | Your CoinMarketCap API key. |
| `baseUrl`   | `string` | No       | `https://pro-api.coinmarketcap.com`    | Base URL for the API.        |

---

## Error Handling

The SDK throws errors for non-successful API responses. Use `try...catch` blocks or `.catch` methods for handling errors.

```typescript
try {
  const data = await api.getNetworksList({});
  console.log(data);
} catch (error) {
  console.error("Error fetching data:", error);
}
```

## Development and Contributions

### Build the SDK
To build the project locally:

```bash
npm run build
```

### Run Tests
TODO: Tests can be added and executed using your preferred testing framework.

---

## License

This project is licensed under the [MIT License](LICENSE).

