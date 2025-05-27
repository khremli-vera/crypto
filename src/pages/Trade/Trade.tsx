import TradeForm from "@/components/Form/TradeForm/TradeForm";

import styles from "./Trade.module.css";

const Trade = () => {
   return (
      <div className={styles.trade}>
         <h1>Trade Form</h1>
         <TradeForm />
      </div>
   );
};

export default Trade;
