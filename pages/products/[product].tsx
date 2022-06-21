import { getAllProducts, getProductBySlug } from "../../services/product";
import ProductDetail from "@scenes/ProductDetail";
import { Product } from "@shared/types";

export default function ProductPage({ product }) {
  return <ProductDetail product={product} />;
}

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

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.product);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
