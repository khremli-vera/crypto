import React, { useEffect, useState, useMemo } from "react";
import { useAuthStore } from "@/shared/stores/authStore";
import type { IProduct } from "@/shared/types/product";
import Button from "@/uikits/Button/Button";
import Select from "@/uikits/Select/Select";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";
import { itemsPerPage, pageLimit } from "@/constants";

import styles from "./TradeForm.module.css";

const TradeForm: React.FC = () => {
   const { data, isLoading, error } = useCryptoAssets(pageLimit * itemsPerPage);

   const products = data.products.filter(
      (item) =>
         typeof item.buy_price === "number" &&
         typeof item.sell_price === "number"
   );
   console.log(products.length);

   const { isAuthenticated } = useAuthStore();
   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
      null
   );
   const [cryptoValue, setCryptoValue] = useState("");
   const [fiatValue, setFiatValue] = useState("");
   const [isCryptoBase, setIsCryptoBase] = useState(true);
   const [operationType, setOperationType] = useState("buy");

   const selectProducts = useMemo(() => {
      return products.map((product) => ({
         title: product.symbol.toUpperCase(),
         value: product.symbol,
      }));
   }, [products]);

   useEffect(() => {
      if (products?.length && !selectedProduct) {
         setSelectedProduct(products[0]);
      }
   }, [products, selectedProduct]);

   useEffect(() => {
      if (!selectedProduct) {
         setFiatValue("");
         return;
      }

      if (isCryptoBase) {
         recalculate(cryptoValue, setCryptoValue, setFiatValue);
      } else {
         recalculate(fiatValue, setFiatValue, setCryptoValue);
      }
   }, [selectedProduct, operationType]);

   const recalculate = (
      value: string,
      inputFn: React.Dispatch<React.SetStateAction<string>>,
      outputFn: React.Dispatch<React.SetStateAction<string>>
   ) => {
      inputFn(value);

      const num = parseFloat(value);
      if (value === "" || isNaN(num) || !selectedProduct) {
         outputFn("");
         return;
      }

      const rate =
         operationType == "buy"
            ? selectedProduct.buy_price!
            : selectedProduct.sell_price!;

      if (isCryptoBase) {
         outputFn((num * rate).toFixed(2));
      } else {
         outputFn((num / rate).toFixed(2));
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!/^\d*\.?\d{0,4}$/.test(value)) return;

      if (e.target.name === "crypto") {
         recalculate(value, setCryptoValue, setFiatValue);
      } else if (e.target.name === "fiat") {
         recalculate(value, setFiatValue, setCryptoValue);
      }
   };

   const handleSwap = () => {
      setIsCryptoBase((prev) => !prev);
   };

   const handleOperationClick = (
      event: React.MouseEvent<HTMLButtonElement>
   ) => {
      setOperationType(event.currentTarget.name);
   };

   if (isLoading) return <h2>Loading...</h2>;
   if (error) return <h2>Error loading products</h2>;
   if (!products || !products.length || !selectedProduct)
      return <h2>No products available</h2>;

   return (
      <form className={styles.form}>
         {isAuthenticated ? (
            ""
         ) : (
            <p className={styles.formError}>Please login to use the form</p>
         )}
         <div className={styles.operationType}>
            <Button
               type='button'
               name='buy'
               className={
                  operationType == "buy" ? "activeWideButton" : "wideButton"
               }
               onClick={handleOperationClick}
            >
               Buy
            </Button>
            <Button
               type='button'
               className={
                  operationType == "sell" ? "activeWideButton" : "wideButton"
               }
               name='sell'
               onClick={handleOperationClick}
            >
               Sell
            </Button>
         </div>
         <div>
            <label className={styles.formLabel}>Crypto Amount:</label>
            <div
               className={`${styles.formRow} ${
                  isCryptoBase ? styles.formRowActive : ""
               }`}
            >
               <input
                  className={styles.formInput}
                  type='number'
                  step='0.01'
                  name='crypto'
                  value={cryptoValue}
                  onChange={handleInputChange}
                  placeholder={
                     isCryptoBase ? "Enter crypto value" : "Crypto value"
                  }
                  readOnly={!isCryptoBase}
                  disabled={!isAuthenticated}
               />
               <Select
                  className='smallSelect'
                  options={selectProducts}
                  value={selectedProduct.symbol}
                  onChange={(e) => {
                     const product = products.find(
                        (p) => p.symbol === e.target.value
                     );
                     if (product) setSelectedProduct(product);
                  }}
               />
            </div>
         </div>
         <Button type='button' onClick={handleSwap} className='blockButton'>
            Swap
         </Button>

         <div>
            <label className={styles.formLabel}>Fiat Amount (USD):</label>
            <div
               className={`${styles.formRow} ${
                  isCryptoBase ? "" : styles.formRowActive
               }`}
            >
               <input
                  className={styles.formInput}
                  type='text'
                  name='fiat'
                  value={fiatValue}
                  readOnly={isCryptoBase}
                  placeholder={isCryptoBase ? "USD value" : "Enter USD value"}
                  onChange={handleInputChange}
                  disabled={!isAuthenticated}
               />
            </div>
         </div>
      </form>
   );
};

export default TradeForm;
