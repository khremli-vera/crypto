import { EXCHANGERATE_URL } from "@/constants";
import { ratesUSD } from "@/hooks/exChangeRates";

type FetchParams = {
   url: string;
};

export const fetchData = async <T>({ url }: FetchParams): Promise<T> => {
   if (url == EXCHANGERATE_URL) {
      return Promise.resolve({ quotes: ratesUSD }) as T;
   }

   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Failed to fetch ${url}`);
   }
   const json = await res.json();
   return json;
};
