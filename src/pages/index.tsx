import type { FC } from "react"
import type { GetStaticProps } from "next"
import type { Content } from "@shared/interfaces"

import { getAllContents } from "@shared/services/page"

import Home from "@scenes/Home"

interface HomeProps {
  contents: Content[]
  showing: number
  total: number
}

const HomePage: FC<HomeProps> = ({ contents, showing, total }) => {
  return <Home contents={contents} showing={showing} total={total} />
}

export default HomePage

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const contents = await getAllContents()
  const toShow = contents?.slice(0, 9)

  const showing = toShow?.length
  const total = contents?.length
  return {
    props: {
      showing,
      total,
      contents: toShow,
    },
  }
}
