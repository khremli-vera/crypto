import TradeForm from "@/components/Form/TradeForm/TradeForm";

import styles from "./Trade.module.css";
import Header from "@/uikits/Header/Header";

const Trade = () => {
   return (
      <>
         <Header />
         <div className={styles.trade}>
            <h1>Trade Form</h1>
            <TradeForm />
         </div>
      </>
   );
};

export default Trade;
