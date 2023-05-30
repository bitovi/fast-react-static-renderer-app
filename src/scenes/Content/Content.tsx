import type { FC } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "next/head"
import Link from "next/link"

import type { Content } from "@shared/interfaces"
import ContentfulImage from "@shared/components/ContentfulImage"

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
        <ContentfulImage
          src={content.image.url}
          alt={content.image.title}
          width={+content.image.width}
          height={+content.image.height}
          progressiveLoad={false}
          sources={[
            { breakpointMax: "500px", width: +content.image.width / 10 },
            {
              breakpointMin: "501px",
              breakpointMax: "768px",
              width: +content.image.width / 2,
            },
            { breakpointMin: "769px", width: +content.image.width },
          ]}
        />
        <div className={styles.info}>
          <div className={styles.description}>
            {documentToReactComponents(content.description.json)}
          </div>
          <div className={styles.price}>
            <span>Price: </span>
            <span>{`$${content.price / 100}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentDetail
