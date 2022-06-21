export async function fetchGraphQL<T>(query, variables?): Promise<T> {
  const contentfulSpaceID = process.env.CONTENTFUL_SPACE_ID;
  const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (
    typeof contentfulSpaceID === "undefined" ||
    typeof contentfulAccessToken === "undefined"
  ) {
    console.log("ERROR: missing Contentful required environtment variable.");
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
