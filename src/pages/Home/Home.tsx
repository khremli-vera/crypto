import ProductList from "@/components/ProductList/ProductList";
import Header from "@/components/uikits/Header/Header";

import styles from "./Home.module.css";

const Home = () => {
   return (
      <>
         <Header />
         <div className={styles.home}>
            <h1>CryptoProducts</h1>
            <ProductList />
         </div>
      </>
   );
};

export default Home;
