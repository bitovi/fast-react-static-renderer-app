import type { FC } from "react"
import type { Page } from "@shared/interfaces"

import Head from "next/head"
import Link from "next/link"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import styles from "./Content.module.css"

const PageDetail: FC<{ page: Page }> = ({ page }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{page.title}</title>
      </Head>
      <div className={styles.breadcrumbs}>
        <span>
          <Link href="/">Home</Link>
        </span>
        <span>&gt;</span>
        <span>{page.title}</span>
      </div>
      <div className={styles.tag}>{page.tag}</div>
      <h1>{page.title}</h1>
      <div className={styles.content}>
        <figure>
          <img src={page.image.url} alt={page.image.title} />
        </figure>
        <div className={styles.description}>
          {documentToReactComponents(page.description.json)}
        </div>
      </div>
    </div>
  )
}

export default PageDetail
