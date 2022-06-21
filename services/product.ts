import { Product } from "@shared/types";
import { fetchGraphQL } from "./api";

function extractProductEntries(fetchResponse): CMSProduct[] {
  return fetchResponse?.data?.productCollection?.items;
}

type CMSProduct = Omit<Product, "id" | "basePrice">;

export async function getAllCMSProducts(): Promise<CMSProduct[]> {
  const entries = await fetchGraphQL<CMSProduct[]>(
    `query {
        productCollection {
            items {
                name
                slug
                description {
                    json
                }
                image {
                    url
                    title,
                    width,
                    height
                }
            }
        }
        }`,
  );
  return extractProductEntries(entries);
}

export async function getAllMenuProducts() {
  const catalogUrl = process.env["CATALOG_URL"];

  try {
    const menu = await fetch(catalogUrl);
    const menuData = await menu.json();
    return menuData.products;
  } catch (e) {
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const cmsProducts = await getAllCMSProducts();
  const menuProducts = await getAllMenuProducts();

  const combinedProducts = cmsProducts?.map((cmsProduct) => ({
    ...cmsProduct,
    ...menuProducts.find((menuProduct) => menuProduct.slug === cmsProduct.slug),
  }));
  return combinedProducts;
}

export async function getCMSProductBySlug(slug): Promise<CMSProduct> {
  const data = await fetchGraphQL(
    `
          query getProduct($slug: String!) {
              productCollection(where:{slug: $slug}, limit: 1) {
                items {
                  name
                  slug
                  description {
                      json
                  }
                  image {
                      url
                      title,
                      width,
                      height
                  }
                }
              }
            }`,
    { slug },
  );

  return extractProductEntries(data)?.[0];
}

export async function getProductBySlug(slug): Promise<Product> {
  const cmsProduct = await getCMSProductBySlug(slug);

  const menuProducts = await getAllMenuProducts();

  const product = {
    ...cmsProduct,
    ...menuProducts.find((menuProduct) => menuProduct.slug === cmsProduct.slug),
  };

  return product;
}
