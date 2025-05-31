import TradeForm from "@/components/Form/TradeForm/TradeForm";
import Header from "@/components/uikits/Header/Header";

import styles from "./Trade.module.css";

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
