export async function fetchGraphQL<Response, Variables = never>(
  query: string,
  variables?: Variables,
): Promise<Response> {
  const contentfulSpaceID = process.env.CONTENTFUL_SPACE_ID;
  const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!contentfulSpaceID || !contentfulAccessToken) {
    throw new Error(
      "Missing environment variable CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN",
    );
  }

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${contentfulAccessToken}`,
      },
      body: JSON.stringify({ query, variables }),
    },
  ).then((response) => response.json());
}
