import { FC, useState } from "react"
import type { Page } from "@shared/interfaces"

import Head from "next/head"

import PageCard from "./components/PageCard"

import styles from "./Home.module.css"
import FeaturedPageCard from "./components/FeaturedPageCard/FeaturedPageCard"

const NUM_OF_PAGES_TO_SHOW = 10
const Home: FC<{ pages: Page[] }> = ({ pages }) => {
  const [lastPageShown, setLastPageShown] = useState(
    pages.length > NUM_OF_PAGES_TO_SHOW ? NUM_OF_PAGES_TO_SHOW : pages.length,
  )

  const totalNumberOfPages = pages.length
  const featuredPage = pages.length > 0 ? pages[0] : null
  const otherPages = pages.length > 1 ? pages.slice(1, lastPageShown) : []

  const showMorePages = () => {
    const numOfRemainingPages = pages.length - lastPageShown
    const numOfExtraPagesToShow =
      numOfRemainingPages > NUM_OF_PAGES_TO_SHOW
        ? NUM_OF_PAGES_TO_SHOW
        : numOfRemainingPages
    if (numOfExtraPagesToShow > 0)
      setLastPageShown((lastPageShown) => lastPageShown + numOfExtraPagesToShow)
  }

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
      <button
        className={styles.banner}
        onClick={showMorePages}
      >{`Showing ${lastPageShown} of ${totalNumberOfPages}`}</button>
    </div>
  )
}

export default Home
