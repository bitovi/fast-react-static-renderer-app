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
  const pages_string = process.env["PAGE_DATA"]
  const pages = await getAllPages()

  if (pages_string) {
    const pagesToFormat = (
      JSON.parse(pages_string) as {
        pages: Array<{ slug: string }>
      }
    ).pages

    const formatted = pagesToFormat.map(({ slug }) => {
      const parsedSlug = slug.split("-benchmark-")[0]
      const page = pages.find((p) => p.slug === parsedSlug)

      return {
        ...page,
        slug,
      }
    })

    return {
      props: {
        pages: formatted,
      },
    }
  }

  return {
    props: {
      pages,
    },
  }
}
