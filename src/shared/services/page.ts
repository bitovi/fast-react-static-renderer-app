import type { Page } from "@shared/interfaces";

import { fetchGraphQL } from "./contentful";

export async function getAllPages(): Promise<Page[]> {
  const entries = await fetchGraphQL<Page[]>(
    `query {
      pageCollection {
        items {
          title
          slug
          description {
            json
          }
        }
      }
    }`,
  );

  return extractPageEntries(entries);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const data = await fetchGraphQL(
    `query getPage($slug: String!) {
      pageCollection(where:{slug: $slug}, limit: 1) {
        items {
          title
          slug
          description {
            json
          }
        }
      }
    }`,
    { slug },
  );

  return extractPageEntries(data)?.[0];
}

function extractPageEntries(fetchResponse): Page[] {
  if (fetchResponse.errors) {
    throw new Error(
      fetchResponse.errors.map((error) => error.message).join("\n"),
    );
  }

  return fetchResponse?.data?.pageCollection?.items;
}