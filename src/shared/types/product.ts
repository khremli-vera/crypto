export interface IProduct {
   id: string;
   name: string;
   current_price: number;
   symbol: string;
   image: string;
   slug?: string;
   buy_price: number;
   sell_price: number;
}

export interface IMessariProduct {
   id: string;
   name: string;
   symbol: string;
   slug: string;
}
