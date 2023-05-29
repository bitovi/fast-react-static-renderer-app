import type { FC } from "react"
import type { Content } from "@shared/interfaces"

import Head from "next/head"
import Link from "next/link"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import styles from "./Content.module.css"

const ContentDetail: FC<{ content: Content }> = ({ content }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{content.name}</title>
      </Head>
      <div className={styles.breadcrumbs}>
        <span>
          <Link href="/">Home</Link>
        </span>
        <span>&gt;</span>
        <span>{content.name}</span>
      </div>
      <h1>{content.name}</h1>
      <div className={styles.content}>
        <img src={content.image.url} alt={content.image.title} />
        <div className={styles.description}>
          {documentToReactComponents(content.description.json)}
        </div>
      </div>
    </div>
  )
}

export default ContentDetail
