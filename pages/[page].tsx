import { getAllPages, getPageBySlug } from "../services/page";
import PageDetail from "@scenes/PageDetail";
import { Page } from "@shared/types";

export default function ContentPage({ page }) {
  return <PageDetail page={page} />;
}

export const getStaticPaths = async () => {
  const pages_string = process.env["PAGE_DATA"];
  let pages: Page[] = [];
  if (typeof pages_string === "undefined") {
    console.log("WARN: PAGE_DATA env var not provided, getting all pages");
    pages = await getAllPages();
  } else {
    pages = JSON.parse(pages_string).pages as Page[];
  }

  const paths = pages.map((page) => {
    return { params: { page: page.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.page);
  console.log(page);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
    },
  };
}
