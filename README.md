## Getting Started

First, create a .env.local file in project's root and add the following environment variables:

- `CONTENTFUL_SPACE_ID`
  - Description: Contentful space id
- `CONTENTFUL_ACCESS_TOKEN`
  - Description: Contentful access token
- `CATALOG_URL`
  - Description: URL to the JSON menu catalog
  

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Parallelize build

If your platform has thousands of products or more, it might be worth it to parallelize the build process to save time and resources.
To do so, we divide the build into multiple batches of product pages. The process is documented in https://github.com/bitovi/fast-react-static-renderer.

In this app, the parallelization is achieved in the `[product].tsx` file, with the `getStaticPaths` function.

`getStaticPaths` is used to statically pre-render paths in a page with dynamic Routes. More info [Here](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)


```javascript
export const getStaticPaths = async () => {
  const products_string = process.env["PRODUCT_DATA"];
  var products: Product[] = [];
  if (typeof products_string === "undefined") {
    console.log(
      "WARN: PRODUCT_DATA env var not provided, getting all products"
    );
    products = await getAllProducts();
  } else {
    products = JSON.parse(products_string).products as Product[];
  }

  const paths = products.map((product) => {
    return { params: { product: product.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
```
The PRODUCT_DATA environment variable injected by the build image determines which product pages will be included in a particular build. The different builds will then be combined and result in the statically rendered application.