import type { FC } from "react"
import type { GetStaticProps } from "next"
import type { Page } from "@shared/interfaces"

import { getAllPages } from "@shared/services/page"

import Home from "@scenes/Home"

interface HomeProps {
  pages: Page[]
  showing: number
  total: number
}

const HomePage: FC<HomeProps> = ({ pages, showing, total }) => {
  return <Home pages={pages} showing={showing} total={total} />
}

export default HomePage

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const pages = await getAllPages()
  const toShow = pages.slice(0, 12)

  const showing = toShow.length
  const total = pages.length
  return {
    props: {
      showing,
      total,
      pages: toShow,
    },
  }
}
