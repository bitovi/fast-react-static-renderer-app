import React, { FC } from "react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./PageCard.module.css";

import { Page } from "../../types";

const PageCard: FC<{ page: Page }> = ({ page }) => {
  const truncateString = (text) => {
    return text?.length > 100 ? `${text.substr(0, 100)}...` : text;
  };
  return (
    <div className={styles.card}>
      <div className={styles.pageCard}>
        <Link href={`/${page.slug}`}>
          <a>
            <p className={styles.pageTitle}>{page.title}</p>
          </a>
        </Link>
      </div>
      <div className={styles.pageDescription}>
        {page.description &&
          documentToReactComponents(page.description.json, {
            renderText: (text) => truncateString(text),
          })}
      </div>
    </div>
  );
};

export default PageCard;
