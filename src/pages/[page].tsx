import type { FC } from "react"
import type { GetStaticProps, GetStaticPaths } from "next"
import type { Page } from "@shared/interfaces"

import { getAllPages, getPageBySlug } from "@shared/services/page"

import Content from "@scenes/Content"

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
  const page = await getPageBySlug(params.page.split("-")[0])

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
  const pages_string = process.env["PAGE_DATA"]
  const pages = pages_string
    ? (JSON.parse(pages_string).pages as Page[])
    : await getAllPages()

  const paths = pages.map((page) => {
    return { params: { page: page.slug } }
  })

  return {
    paths,
    fallback: "blocking",
  }
}
