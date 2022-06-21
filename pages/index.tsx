import Home from "@scenes/Home";
import { getAllProducts } from "../services/product";
import { GetStaticProps, NextPage } from "next";

export default function HomePage({ products }): JSX.Element {
  return <Home products={products} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();

  if (!products) {
    return { props: {} };
  }

  return {
    props: {
      products,
    },
  };
};
