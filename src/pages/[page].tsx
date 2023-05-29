import type { FC } from "react"
import type { GetStaticProps, GetStaticPaths } from "next"
import type { Content as ContentType } from "@shared/interfaces"

import fs from "fs"

import { getAllContents, getContentBySlug } from "@shared/services/page"
import Content from "@scenes/Content"

interface ContentProps {
  content: ContentType
}

interface ContentDatum {
  slug: string
}
interface ContentData {
  pages: Array<ContentDatum>
}

const ContentPage: FC<ContentProps> = ({ content }) => {
  return <Content content={content} />
}

export default ContentPage

export const getStaticProps: GetStaticProps<
  ContentProps,
  { page: string }
> = async ({ params }) => {
  const content = await getContentBySlug(params.page.split("-benchmark-")[0])

  if (!content) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      content,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = await getContentsFromSource()

  const paths = contents.map((page) => {
    return { params: { page: page.slug } }
  })

  return {
    paths,
    fallback: "blocking",
  }
}

const getContentsFromSource = async (): Promise<ContentDatum[]> => {
  const filePath = process.env["PAGE_DATA_FILE"]
  if (filePath) {
    const parsedFile = JSON.parse(
      fs.readFileSync(filePath, "utf-8"),
    ) as ContentData

    return parsedFile.pages
  }

  return getAllContents()
}
