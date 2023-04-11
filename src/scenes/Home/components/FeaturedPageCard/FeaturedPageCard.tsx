import type { FC } from "react"
import type { Page } from "@shared/interfaces"

import Link from "next/link"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import styles from "./FeaturedPageCard.module.css"
import { truncateString } from "@scenes/Home/utils"

const FeaturedPageCard: FC<{ page: Page }> = ({ page }) => {
  return (
    <Link href={`/${page.slug}`}>
      <article className={styles.featuredCardArticle}>
        <div
          className={styles.featuredCardImage}
          style={{
            backgroundImage: `url(${page.image.url})`,
          }}
        ></div>
        <div>
          <div className={styles.featuredCardMeta}>
            <div className={styles.featuredCardTag}>{page.tag}</div>
            <p className={styles.featuredCardtitle}>{page.title}</p>
            <p className={styles.featuredCardSub}>
              {documentToReactComponents(page.description.json, {
                renderText: (text) => truncateString(text),
              })}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default FeaturedPageCard
