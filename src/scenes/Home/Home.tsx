import type { FC } from "react"
import type { Page } from "@shared/interfaces"

import Head from "next/head"

import PageCard from "./components/PageCard"

import styles from "./Home.module.css"

const Home: FC<{ pages: Page[]; showing: number; total: number }> = ({
  pages,
  showing,
  total,
}) => {
  return (
    <div>
      <Head>
        <title>React render farm</title>
      </Head>

      <div className={styles.banner}>{`Showing ${showing} of ${total}`}</div>
      <div className={styles.homeLayout}>
        <div className={styles.pageColumn}>
          <div className={styles.pageList}>
            {pages.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
