import React from "react";
import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import Button from "@/uikits/Button/Button";
import Select from "@/uikits/Select/Select";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";
import { IProduct } from "@/shared/types/product";

import styles from "./ProductList.module.css";
import { itemsPerPage } from "@/constants";

const ProductList = () => {
   const [page, setPage] = useState(1);
   const [allProducts, setAllProducts] = useState<IProduct[]>([]);
   const [sortOption, setSortOption] = useState("default");

   const { data, isLoading, error } = useCryptoAssets(page, itemsPerPage);

   const maxPage = data?.maxPage || 1;

   useEffect(() => {
      if (data?.products) {
         setAllProducts((prev) => [...prev, ...data.products]);
      }
   }, [data]);

   const sortedProducts = useMemo(() => {
      if (!allProducts.length) return [];

      const sorted = [...allProducts];
      switch (sortOption) {
         case "nameAZ":
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
         case "nameZA":
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
         case "priceToHigh":
            sorted.sort((a, b) => a.buy_price - b.buy_price);
            break;
         case "priceToLow":
            sorted.sort((a, b) => b.buy_price - a.buy_price);
            break;
         default:
            sorted;
      }

      return sorted;
   }, [allProducts, sortOption]);

   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value);
      // setPage(1);
   };

   const handleShowMore = () => {
      setPage((prev) => prev + 1);
   };

   if (isLoading) return <h2>Loading...</h2>;
   if (error) return <h2>Error loading products</h2>;
   if (!allProducts || !allProducts.length)
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
         {page < maxPage && (
            <Button onClick={handleShowMore} className='borderButton'>
               Load more
            </Button>
         )}
      </div>
   );
};

export default ProductList;
