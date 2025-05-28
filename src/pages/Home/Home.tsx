import ProductList from "@/components/ProductList/ProductList";
import Header from "@/uikits/Header/Header";

import styles from "./Home.module.css";
// посмтотеть с большой буква тили или нет

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
