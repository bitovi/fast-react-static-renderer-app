import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import styles from "./pageDetails.module.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Page } from "@shared/types";

const PageDetail: FC<{ page: Page }> = ({ page }) => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span>
          <Link href="/">Home</Link>
        </span>
        <span>&gt;</span>
        <span>{page.title}</span>
      </div>

      <div className={styles.pageDetails}>
        <Head>
          <title>{page.title}</title>
        </Head>

        <h1 className={styles.pageTitle}>{page.title}</h1>
        <div className={styles.pageDescription}>
          {page.description && documentToReactComponents(page.description.json)}
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
