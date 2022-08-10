const mockContentfulResponse = {
  data: {
    pageCollection: {
      items: [],
    },
  },
}

const aboutPage = {
  title: "About",
  slug: "about",
  description: {
    json: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "Bitovi is an end-to-end app delivery consultancy that believes strongly in contributing to open source",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph",
          data: {},
          content: [{ nodeType: "text", value: "", marks: [], data: {} }],
        },
      ],
    },
  },
}

const contactPage = {
  title: "Contact us",
  slug: "home",
  description: {
    json: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value: "Want to chat about open source with us? ",
              marks: [],
              data: {},
            },
            {
              nodeType: "hyperlink",
              data: {
                uri: "https://www.bitovi.com/community/slack",
              },
              content: [
                {
                  nodeType: "text",
                  value: "Join our community Slack.",
                  marks: [],
                  data: {},
                },
              ],
            },
            { nodeType: "text", value: "", marks: [], data: {} },
          ],
        },
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value: "Want updates on our new open source projects? ",
              marks: [],
              data: {},
            },
            {
              nodeType: "hyperlink",
              data: { uri: "https://twitter.com/bitovi" },
              content: [
                {
                  nodeType: "text",
                  value: "Follow us on Twitter.",
                  marks: [],
                  data: {},
                },
              ],
            },
            { nodeType: "text", value: "", marks: [], data: {} },
          ],
        },
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value: "Need help? ",
              marks: [],
              data: {},
            },
            {
              nodeType: "hyperlink",
              data: {
                uri: "https://www.bitovi.com/frontend-javascript-consulting/react-consulting",
              },
              content: [
                {
                  nodeType: "text",
                  value: "Set up a free consultation.",
                  marks: [],
                  data: {},
                },
              ],
            },
            { nodeType: "text", value: "", marks: [], data: {} },
          ],
        },
      ],
    },
  },
}

type MockedPage = typeof aboutPage | typeof contactPage

const createResponse = (...pages: MockedPage[]) => {
  return {
    data: {
      pageCollection: {
        items: [...pages],
      },
    },
    errors: null,
  }
}

export const getAll = (): typeof mockContentfulResponse => {
  return createResponse(aboutPage, contactPage)
}

export const getBySlug = (
  slug: string,
): typeof mockContentfulResponse.data.pageCollection.items[number] => {
  const page = slug === "about" ? aboutPage : contactPage

  return createResponse(page)
}
