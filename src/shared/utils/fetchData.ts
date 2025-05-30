type FetchParams = {
   url: string;
};

export const fetchData = async <T>({ url }: FetchParams): Promise<T> => {
   const res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Failed to fetch ${url}`);
   }
   const json = await res.json();

   return json;
};
