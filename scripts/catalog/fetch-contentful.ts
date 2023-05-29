import { getAllContents } from "../../src/shared/services/content"

const fetchContentfulContents = async (): Promise<void> => {
  const contentfulContents = await getAllContents()

  const buildData = { pages: contentfulContents.map(({ slug }) => ({ slug })) }

  console.log(JSON.stringify(buildData))
}

fetchContentfulContents()
