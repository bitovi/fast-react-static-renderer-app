import { getAllPages } from "../../src/shared/services/page"

const fetchContentfulPages = async (): Promise<void> => {
  const contentfulPages = await getAllPages()

  const buildData = { pages: contentfulPages.map(({ slug }) => ({ slug })) }

  console.log(JSON.stringify(buildData))
}

fetchContentfulPages()
