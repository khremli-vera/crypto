import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
   MESSARI_URL,
   COINGECKO_URL,
   EXCHANGERATE_URL,
   rateMultiplier,
   pageLimit,
} from "@/constants";
import { IProduct, IProductDTO } from "@/shared/types/product";

import { ICryptoData } from "@/shared/types/cryptoData";
import { coingeckoAssets } from "./coingeckoAssets";
import { ratesUSD } from "./exChangeRates";

export const useCryptoAssets = (
   page: number,
   limit: number
): UseQueryResult<ICryptoData> => {
   return useQuery({
      queryKey: ["crypto-assets", page],
      queryFn: async () => {
         // вернуть этот вариант потом, пока ошибка на fetch(COINGECKO_URL)

         // const [messariRes, coingeckoRes, ratesRes] = await Promise.all([
         //    fetch(`${MESSARI_URL}?limit=${itemsPerPage * page}`),
         //    fetch(COINGECKO_URL),
         //    fetch(EXCHANGERATE_URL),
         // ]);

         // if (!messariRes.ok || !coingeckoRes.ok || !ratesRes.ok) {
         //    throw new Error("Failed to fetch crypto data");
         // }

         // const messariJson = await messariRes.json();
         // const messariAssets: IProduct[] = messariJson.data;

         // const total = messariJson.meta.total;
         // const maxPage = Math.ceil(total / itemsPerPage);

         // const coingeckoAssets: IProduct[] = await coingeckoRes.json();

         // const ratesJson = await ratesRes.json();
         // const ratesUSD = ratesJson.quotes;;

         const [messariRes] = await Promise.all([
            fetch(`${MESSARI_URL}?limit=${limit}&page=${page}`),
         ]);

         if (!messariRes.ok) {
            throw new Error("Failed to fetch crypto data");
         }

         const messariJson = await messariRes.json();

         const messariAssets: IProductDTO[] = messariJson.data;

         const maxPage = pageLimit;
         const coingeckoMap = new Map(
            coingeckoAssets.map((item) => [item.symbol.toLowerCase(), item])
         );

         const products: IProduct[] = messariAssets
            .map((asset) => {
               const match = coingeckoMap.get(asset.symbol.toLowerCase());
               if (!match) return null;

               return {
                  id: asset.id,
                  name: asset.name,
                  symbol: asset.symbol,
                  slug: asset.slug,
                  image: match.image,
                  buy_price:
                     (1 /
                        ratesUSD[
                           `USD${asset.symbol.toUpperCase().slice(0, 3)}`
                        ]) *
                        (1 - rateMultiplier) ||
                     match.current_price * (1 + rateMultiplier),
                  sell_price:
                     (1 /
                        ratesUSD[
                           `USD${asset.symbol.toUpperCase().slice(0, 3)}`
                        ]) *
                        (1 + rateMultiplier) ||
                     match.current_price * (1 - rateMultiplier),
               };
            })
            .filter(Boolean) as IProduct[];

         return {
            products,
            maxPage,
         };
      },
      staleTime: 1000 * 60,
   });
};
