import { useQueries, useInfiniteQuery } from "@tanstack/react-query";
import { IMessariProduct, IProduct } from "@/shared/types/product";
import {
   MESSARI_URL,
   COINGECKO_URL,
   EXCHANGERATE_URL,
   rateMultiplier,
} from "@/constants";
import { ratesUSD } from "./exChangeRates";

type FetchParams = {
   url: string;
};

const fetchData = async <T>({ url }: FetchParams): Promise<T> => {
   if (url == EXCHANGERATE_URL) {
      return Promise.resolve({ quotes: ratesUSD }) as T;
   }

   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Failed to fetch ${url}`);
   }

   const json = await res.json();
   console.log(json);
   return json;
};

export const useCryptoAssets = (limit: number) => {
   const results = useQueries({
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

   const [coingecko, rates] = results;

   const {
      fetchNextPage,
      fetchPreviousPage,
      hasNextPage,
      hasPreviousPage,
      isFetchingNextPage,
      isFetchingPreviousPage,
      promise,
      ...messariResult
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

   const isLoading = results.some((r) => r.isLoading);
   const error = results.find((r) => r.error)?.error;

   let products: IProduct[] = [];

   if (messariResult.data && coingecko.data && rates.data) {
      const messariAssets = messariResult.data.pages.flatMap(
         (item) => item.data
      );
      console.log(messariAssets);
      const coingeckoMap = new Map(
         coingecko.data.map((item) => [item.symbol.toLowerCase(), item])
      );
      const ratesUSD = rates.data.quotes;
      products = messariAssets
         .map((asset) => {
            const match = coingeckoMap.get(asset.symbol.toLowerCase());
            if (!match) return null;
            const rateKey = `USD${asset.symbol.toUpperCase().slice(0, 3)}`;
            const rate = ratesUSD[rateKey];
            return {
               id: asset.id,
               name: asset.name,
               symbol: asset.symbol,
               slug: asset.slug,
               image: match.image,
               buy_price: rate
                  ? (1 / rate) * (1 - rateMultiplier)
                  : match.current_price * (1 + rateMultiplier),
               sell_price: rate
                  ? (1 / rate) * (1 + rateMultiplier)
                  : match.current_price * (1 - rateMultiplier),
            };
         })
         .filter(Boolean) as IProduct[];
   }

   return {
      data: { products },
      isLoading,
      error,
      fetchNextPage,
      hasNextPage,
   };
};
