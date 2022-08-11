import type { FC } from "react"
import type { GetStaticProps, GetStaticPaths } from "next"
import type { Page } from "@shared/interfaces"

import { getAllPages, getPageBySlug } from "@shared/services/page"

import Content from "@scenes/Content"

import fs from "fs"

interface ContentProps {
  page: Page
}

const ContentPage: FC<ContentProps> = ({ page }) => {
  return <Content page={page} />
}

export default ContentPage

export const getStaticProps: GetStaticProps<
  ContentProps,
  { page: string }
> = async ({ params }) => {
  const page = await getPageBySlug(params.page.split("-benchmark-")[0])

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
  }
}

const getPagesFromSource = async (): Promise<Page[]> => {
  const filePath = process.env["PAGE_DATA_FILE"]
  if (filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")).pages as Page[]
  }

  const pages_string = process.env["PAGE_DATA"]

  return pages_string
    ? (JSON.parse(pages_string).pages as Page[])
    : await getAllPages()
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPagesFromSource()

  const paths = pages.map((page) => {
    return { params: { page: page.slug } }
  })

  return {
    paths,
    fallback: "blocking",
  }
}
