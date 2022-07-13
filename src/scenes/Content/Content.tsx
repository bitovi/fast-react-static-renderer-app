import type { FC } from "react";
import type { Page } from "@shared/interfaces";

import Head from "next/head";
import Link from "next/link";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import styles from "./Content.module.css";

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
          {documentToReactComponents(page.description.json)}
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
