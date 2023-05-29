import type { Content } from "@shared/interfaces"

import { fetchGraphQL } from "./contentful"

export async function getAllContents(): Promise<Content[]> {
  const entries = await fetchGraphQL<Content[]>(
    `query {
      productCollection {
        items {
          name
          slug
          price
          image {
            title
            url
          }
          description {
            json
          }
        }
      }
    }`,
  )

  return extractContentEntries(entries)
}

export async function getContentBySlug(slug: string): Promise<Content> {
  const data = await fetchGraphQL(
    `query getPage($slug: String!) {
      productCollection(where:{slug: $slug}, limit: 1) {
        items {
          name
          slug
          price
          image {
            title
            url
          }
          description {
            json
          }
        }
      }
    }`,
    { slug },
  )

  return extractContentEntries(data)?.[0]
}

function extractContentEntries(fetchResponse): Content[] {
  if (fetchResponse.errors) {
    throw new Error(
      fetchResponse.errors.map((error) => error.message).join("\n"),
    )
  }

  // ENV var for benchmarking. If its not provided, the normal app functionality will occur
  if (!process.env.NUMBER_OF_PAGES) {
    return fetchResponse?.data?.productCollection?.items
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
