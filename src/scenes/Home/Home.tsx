import { FC } from "react"
import type { Content } from "@shared/interfaces"

import Head from "next/head"

import PageCard from "./components/PageCard"

import styles from "./Home.module.css"

const Home: FC<{ contents: Content[]; showing: number; total: number }> = ({
  contents,
  showing,
  total,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bitovi Store Home Page</title>
      </Head>
      <div className={styles.row}>
        {contents?.map((content) => (
          <PageCard key={content.slug} content={content} />
        ))}
      </div>
      <button
        className={styles.banner}
      >{`Showing ${showing} of ${total}`}</button>
    </div>
  )
}

export default Home
