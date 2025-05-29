import React from "react";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import Button from "@/uikits/Button/Button";
import Select from "@/uikits/Select/Select";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";

import styles from "./ProductList.module.css";
import { itemsPerPage } from "@/constants";

const ProductList = () => {
   const [sortOption, setSortOption] = useState("default");

   const { data, isLoading, error, fetchNextPage, hasNextPage } =
      useCryptoAssets(itemsPerPage);

   const sortedProducts = useMemo(() => {
      if (!data?.products.length) return [];

      const sorted = [...data.products];
      switch (sortOption) {
         case "nameAZ":
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
         case "nameZA":
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
         case "priceToHigh":
            sorted
               .filter((item) => typeof item.buy_price === "number")
               .sort((a, b) => a.buy_price! - b.buy_price!);
            break;
         case "priceToLow":
            sorted
               .filter((item) => typeof item.buy_price === "number")
               .sort((a, b) => b.buy_price! - a.buy_price!);
            break;
         default:
            sorted;
      }

      return sorted;
   }, [data.products, sortOption]);

   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value);
   };

   if (isLoading) return <h2>Loading...</h2>;
   if (error) return <h2>Error loading products</h2>;
   if (!data.products || !data.products.length)
      return <h2>No products available</h2>;

   return (
      <div className={styles.productsContainer}>
         <div className={styles.selectContainer}>
            <Select
               options={[
                  { title: "Select sort order", value: "" },
                  { title: "Name (A-Z)", value: "nameAZ" },
                  { title: "Name (Z-A)", value: "nameZA" },
                  { title: "Price (Low to High)", value: "priceToHigh" },
                  { title: "Price (High to Low)", value: "priceToLow" },
               ]}
               value={sortOption}
               onChange={handleSortChange}
            />
         </div>
         <div className={styles.productList}>
            {sortedProducts.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))}
         </div>
         {hasNextPage && (
            <Button onClick={() => fetchNextPage()} className='borderButton'>
               Load more
            </Button>
         )}
      </div>
   );
};

export default ProductList;
