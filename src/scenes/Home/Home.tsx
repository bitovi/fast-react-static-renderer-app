import type { FC } from "react"
import type { Page } from "@shared/interfaces"

import Head from "next/head"

import PageCard from "./components/PageCard"

import styles from "./Home.module.css"
import FeaturedPageCard from "./components/FeaturedPageCard/FeaturedPageCard"

const Home: FC<{ pages: Page[]; showing: number; total: number }> = ({
  pages,
  showing,
  total,
}) => {
  const featuredPage = pages.length > 0 ? pages[0] : null
  const otherPages = pages.length > 1 ? pages.slice(1) : []
  return (
    <div className={styles.container}>
      <Head>
        <title>Bitovi Store Home Page</title>
      </Head>
      <div className={styles.row}>
        {featuredPage && (
          <FeaturedPageCard key={featuredPage.slug} page={featuredPage} />
        )}
        {otherPages.map((page) => (
          <PageCard key={page.slug} page={page} />
        ))}
      </div>
      <div className={styles.banner}>{`Showing ${showing} of ${total}`}</div>
    </div>
  )
}

export default Home
