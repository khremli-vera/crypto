//add limit 150 products due to analysis that only 15 first pages return products with rates
export const pageLimit = 15;
export const itemsPerPage = 10;

export const MESSARI_URL = "https://data.messari.io/api/v2/assets";
export const COINGECKO_URL =
   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
export const EXCHANGERATE_URL =
   "https://api.exchangerate.host/live?access_key=62bfeacce37adb7a8293e07e214a55a1";

//spread for buy/sell rates
export const rateMultiplier = 0.001;
