import { getAllContents } from "../../src/shared/services/page"

const fetchContentfulPages = async (): Promise<void> => {
  const contentfulContents = await getAllContents()

  const buildData = {
    count: contentfulContents.length,
    instances: [
      {
        count: contentfulContents.length,
        data: { pages: contentfulContents.map(({ slug }) => ({ slug })) },
      },
    ],
  }

  console.log(JSON.stringify(buildData))
}

fetchContentfulPages()
