import type { FC } from "react";
import type { Page } from "@shared/interfaces";

import Link from "next/link";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import styles from "./PageCard.module.css";

const PageCard: FC<{ page: Page }> = ({ page }) => {
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
        {documentToReactComponents(page.description.json, {
          renderText: (text) => truncateString(text),
        })}
      </div>
    </div>
  );
};

export default PageCard;

const truncateString = (text) => {
  return text?.length > 100 ? `${text.substr(0, 100)}...` : text;
};
