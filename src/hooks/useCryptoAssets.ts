import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
   MESSARI_URL,
   COINGECKO_URL,
   EXCHANGERATE_URL,
   rateMultiplier,
   pageLimit,
} from "@/constants";
import { IProduct, IProductDTO } from "@/shared/types/product";
import { itemsPerPage } from "@/constants";
import { ICryptoData } from "@/shared/types/cryptoData";
import { coingeckoAssets } from "./coingeckoAssets";

export const useCryptoAssets = (page: number): UseQueryResult<ICryptoData> => {
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

         // const ratesJson: any = await ratesRes.json();
         // console.log(ratesJson);

         const [messariRes, ratesRes] = await Promise.all([
            fetch(`${MESSARI_URL}?limit=${itemsPerPage * page}`),
            fetch(EXCHANGERATE_URL),
         ]);

         if (!messariRes.ok || !ratesRes.ok) {
            throw new Error("Failed to fetch crypto data");
         }

         const messariJson = await messariRes.json();

         const messariAssets: IProductDTO[] = messariJson.data;

         const maxPage = pageLimit;

         const ratesJson = await ratesRes.json();
         const ratesUSD = ratesJson.quotes;
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
                     (1 / ratesUSD[`USD${asset.symbol.toUpperCase()}`]) *
                        (1 - rateMultiplier) ||
                     match.current_price * (1 + rateMultiplier),
                  sell_price:
                     (1 / ratesUSD[`USD${asset.symbol.toUpperCase()}`]) *
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
