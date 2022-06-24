import Head from "next/head";
import styles from "./Home.module.css";
import PageCard from "../../shared/components/PageCard";
import { Page } from "../../shared/types";
import { FC } from "react";

const Home: FC<{ pages: Page[] }> = ({ pages }) => {
  return (
    <div>
      <Head>
        <title>React render farm</title>
      </Head>

      <div className={styles.homeLayout}>
        <div className={styles.pageColumn}>
          <div className={styles.pageList}>
            {pages?.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
