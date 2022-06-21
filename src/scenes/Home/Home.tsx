import Head from "next/head";
import styles from "./Home.module.css";
import ProductCard from "../../shared/components/ProductCard";
import { Product } from "../../shared/types";
import { FC } from "react";

const Home: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>React render farm</title>
      </Head>

      <div className={styles.homeLayout}>
        <div className={styles.productColumn}>
          <h1>Featured</h1>
          <div className={styles.productList}>
            {products?.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
