## Getting Started

First, create a .env.local file in project's root and add the following environment variables:

- `CONTENTFUL_SPACE_ID`
  - Description: Contentful space id
- `CONTENTFUL_ACCESS_TOKEN`
  - Description: Contentful access token
  

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GraphQL to fetch Contentful data


## Parallelize build

If your platform has thousands of pages or more, it might be worth it to parallelize the build process to save time and resources.
To do so, we divide the build into multiple batches of pages. The process is documented in https://github.com/bitovi/fast-react-static-renderer.

In this app, the parallelization is achieved in the `[page].tsx` file, with the `getStaticPaths` function.

`getStaticPaths` is used to statically pre-render paths in a page with dynamic Routes. More info [Here](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)


```javascript
export const getStaticPaths = async () => {
  const pages_string = process.env["PAGE_DATA"];
  let pages: Content[] = [];
  if (typeof pages_string === "undefined") {
    console.log("WARN: PAGE_DATA env var not provided, getting all pages");
    pages = await getAllContents();
  } else {
    pages = JSON.parse(pages_string).pages as Content[];
  }

  const paths = pages.map((page) => {
    return { params: { page: page.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
```
The PAGE_DATA environment variable injected by the build image determines which pages will be included in a particular build. The different builds will then be combined and result in the statically rendered application.