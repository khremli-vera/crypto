export interface IProductDTO {
   id: string;
   name: string;
   current_price: number;
   symbol: string;
   image: string;
   slug?: string;
}

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
