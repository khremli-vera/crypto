export interface IProduct {
   id: string;
   name: string;
   current_price: number;
   symbol: string;
   image: string;
   slug?: string;
   buy_price: number | null;
   sell_price: number | null;
}

export interface IMessariProduct {
   id: string;
   name: string;
   symbol: string;
   slug: string;
}
