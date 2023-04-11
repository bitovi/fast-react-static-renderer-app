import type { FC } from "react"
import type { Page } from "@shared/interfaces"

import Link from "next/link"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import styles from "./PageCard.module.css"
import { truncateString } from "@scenes/Home/utils"

const PageCard: FC<{ page: Page }> = ({ page }) => {
  return (
    <Link href={`/${page.slug}`}>
      <article className={styles.cardArticle}>
        <div className={styles.cardContainer}>
          <div
            className={styles.cardImage}
            style={{
              backgroundImage: `url(${page.image.url})`,
            }}
          ></div>
          <div className={styles.cardMeta}>
            <div className={styles.cardTag}>{page.tag}</div>
            <div className={styles.cardTitle}>{page.title}</div>
            <div className={styles.cardSub}>
              {documentToReactComponents(page.description.json, {
                renderText: (text) => truncateString(text),
              })}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PageCard
