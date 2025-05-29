import { IProduct } from "@/shared/types/product";
import { useState } from "react";
import Select from "@/uikits/Select/Select";
import React from "react";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
   product: IProduct;
}

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
   const [priceType, setPriceType] = useState("buy");
   const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPriceType(e.target.value);
   };

   return (
      <div className={styles.productCard}>
         <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
         />

         <h3 className={styles.productTitle}>
            {product.name}{" "}
            <span className={styles.productSymbol}>
               {product.symbol.toUpperCase()}
            </span>
         </h3>
         {typeof product.buy_price === "number" &&
         typeof product.sell_price === "number" ? (
            priceType === "buy" ? (
               <p className={styles.productPrice}>
                  ${product.buy_price.toFixed(4)}
               </p>
            ) : (
               <p className={styles.productPrice}>
                  ${product.sell_price.toFixed(4)}
               </p>
            )
         ) : (
            <p className={styles.productPrice}>No data</p>
         )}

         <Select
            options={[
               { title: "Buy", value: "buy" },
               { title: "Sell", value: "sell" },
            ]}
            value={priceType}
            onChange={handleActionChange}
            className='smallSelect'
         />
      </div>
   );
});
