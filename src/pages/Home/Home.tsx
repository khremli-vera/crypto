import ProductList from "@/components/ProductList/ProductList";

import styles from "./Home.module.css";

const Home = () => {
   return (
      <div className={styles.home}>
         <h1>CryptoProducts</h1>
         <ProductList />
      </div>
   );
};

export default Home;
