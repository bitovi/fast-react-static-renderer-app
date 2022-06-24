import Home from "@scenes/Home";
import { getAllPages } from "../services/page";
import { GetStaticProps } from "next";

export default function HomePage({ pages }): JSX.Element {
  return <Home pages={pages} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = await getAllPages();

  if (!pages) {
    return { props: {} };
  }

  return {
    props: {
      pages,
    },
  };
};
