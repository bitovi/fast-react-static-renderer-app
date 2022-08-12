import type { FC } from "react"
import type { GetStaticProps, GetStaticPaths } from "next"
import type { Page } from "@shared/interfaces"

import fs from "fs"

import { getAllPages, getPageBySlug } from "@shared/services/page"
import Content from "@scenes/Content"

interface ContentProps {
  page: Page
}

interface PageDatum {
  slug: string
}
interface PageData {
  pages: Array<PageDatum>
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

const getPagesFromSource = async (): Promise<PageDatum[]> => {
  const filePath = process.env["PAGE_DATA_FILE"]
  if (filePath) {
    const parsedFile = JSON.parse(
      fs.readFileSync(filePath, "utf-8"),
    ) as PageData

    return parsedFile.pages
  }

  return getAllPages()
}
