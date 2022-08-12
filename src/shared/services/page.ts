import type { Page } from "@shared/interfaces"

import { fetchGraphQL } from "./contentful"
import { getAll, getBySlug } from "./fixtures"

export async function getAllPages(): Promise<Page[]> {
  const entries = getAll()

  // const entries = process.env["MOCK_CALL"]
  //   ? getAll()
  //   : await fetchGraphQL<Page[]>(
  //       `query {
  //     pageCollection {
  //       items {
  //         title
  //         slug
  //         description {
  //           json
  //         }
  //       }
  //     }
  //   }`,
  //     )

  return extractPageEntries(entries)
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const data = getBySlug(slug)

  // const data = process.env["MOCK_CALL"]
  //   ? getBySlug(slug)
  //   : await fetchGraphQL(
  //       `query getPage($slug: String!) {
  //     pageCollection(where:{slug: $slug}, limit: 1) {
  //       items {
  //         title
  //         slug
  //         description {
  //           json
  //         }
  //       }
  //     }
  //   }`,
  //       { slug },
  //     )

  return extractPageEntries(data)?.[0]
}

function extractPageEntries(fetchResponse): Page[] {
  if (fetchResponse.errors) {
    throw new Error(
      fetchResponse.errors.map((error) => error.message).join("\n"),
    )
  }

  // ENV var for benchmarking. If its not provided, the normal app functionality will occur
  if (!process.env.NUMBER_OF_PAGES) {
    return fetchResponse?.data?.pageCollection?.items
  }

  // Build extra pages
  const pages = fetchResponse?.data?.pageCollection?.items
  const numberOfPages = Number(process.env.NUMBER_OF_PAGES) - pages.length

  const extraPagesForBenchmarking = [...Array(numberOfPages).keys()].map(
    (index) => {
      const pageIndex = index % pages.length

      return {
        ...pages[pageIndex],
        slug: `${pages[pageIndex].slug}-benchmark-${index}`,
      }
    },
  )

  return [...pages, ...extraPagesForBenchmarking]
}
