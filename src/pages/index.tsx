import type { FC } from "react"
import type { GetStaticProps } from "next"
import type { Page } from "@shared/interfaces"

import { getAllPages } from "@shared/services/page"

import Home from "@scenes/Home"

interface HomeProps {
  pages: Page[]
}

const HomePage: FC<HomeProps> = ({ pages }) => {
  return <Home pages={pages} />
}

export default HomePage

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const pages = await getAllPages()
  return {
    props: {
      pages,
    },
  }
}
