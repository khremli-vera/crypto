import { useQueries, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IMessariProduct, IProduct } from "@/shared/types/product";
import {
   MESSARI_URL,
   COINGECKO_URL,
   EXCHANGERATE_URL,
   rateMultiplier,
} from "@/constants";
import { fetchData } from "@/shared/utils/fetchData";

export const useCryptoAssets = (limit: number) => {
   const [preparedProducts, setPreparedProducts] = useState<IProduct[]>([]);

   const [coingecko, rates] = useQueries({
      queries: [
         {
            queryKey: ["coingecko"],
            queryFn: () =>
               fetchData<IProduct[]>({
                  url: COINGECKO_URL,
               }),
            staleTime: 1000 * 60,
         },
         {
            queryKey: ["rates"],
            queryFn: () =>
               fetchData<{ quotes: Record<string, number> }>({
                  url: EXCHANGERATE_URL,
               }),
            staleTime: 1000 * 60,
         },
      ],
   });

   const {
      data: messariPages,
      fetchNextPage,
      hasNextPage,
      isLoading: isLoadingMessari,
      error: messariError,
   } = useInfiniteQuery({
      queryKey: ["messari", limit],
      queryFn: ({ pageParam }) =>
         fetchData<{ data: IMessariProduct[] }>({
            url: `${MESSARI_URL}?limit=${limit}&page=${pageParam}`,
         }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
         if (lastPage.data.length === 0) {
            return undefined;
         }
         return lastPageParam + 1;
      },
   });

   const isLoading = isLoadingMessari || coingecko.isLoading || rates.isLoading;
   const error = messariError || coingecko.error || rates.error;

   useEffect(() => {
      if (!messariPages?.pages || !coingecko.data || !rates.data) return;
      const messariAssets = messariPages.pages.flatMap((item) => item.data);
      const coingeckoMap = new Map(
         coingecko.data.map((item) => [item.symbol.toLowerCase(), item])
      );
      const ratesUSD = rates.data.quotes;

      const products = messariAssets.map((asset) => {
         const match = coingeckoMap.get(asset.symbol.toLowerCase());
         const rateKey = `USD${asset.symbol.toUpperCase().slice(0, 3)}`;
         const rate = ratesUSD[rateKey];
         return {
            id: asset.id,
            name: asset.name,
            symbol: asset.symbol,
            slug: asset.slug,
            image: match ? match.image : "/assets/Placeholder.svg",
            buy_price: rate
               ? (1 / rate) * (1 - rateMultiplier)
               : match
               ? match.current_price * (1 + rateMultiplier)
               : null,
            sell_price: rate
               ? (1 / rate) * (1 + rateMultiplier)
               : match
               ? match.current_price * (1 - rateMultiplier)
               : null,
         };
      }) as IProduct[];
      setPreparedProducts(products);
   }, [messariPages?.pages, coingecko.data, rates.data]);

   return {
      data: { preparedProducts },
      isLoading,
      error,
      fetchNextPage,
      hasNextPage,
   };
};
