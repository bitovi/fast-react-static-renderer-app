import ContentfulImage from "src/shared/components/ContentfulImage";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import styles from "./productDetails.module.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Product } from "@shared/types";

const ProductDetail: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span>
          <Link href="/">Home</Link>
        </span>
        <span>&gt;</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.productDetails}>
        <Head>
          <title>{product.name}</title>
        </Head>

        <h1 className={styles.productTitle}>{product.name}</h1>
        <div className={styles.productDescription}>
          {product.description &&
            documentToReactComponents(product.description.json)}
        </div>
        <p className={styles.productPrice}>${product.basePrice / 100}</p>
        <button className={styles.addToCart}>Add to Cart</button>

        <div className={styles.productImage}>
          {product.image && (
            <ContentfulImage
              src={product.image.url}
              alt={product.image.title || product.name}
              width={product.image.width}
              height={product.image.height}
              sources={[
                {
                  breakpointMax: "480px",
                  width: 370,
                  quality: 75,
                },
                {
                  breakpointMin: "481px",
                  breakpointMax: "1200px",
                  width: 500,
                  quality: 75,
                },
                {
                  breakpointMin: "1201px",
                  width: 664,
                  quality: 75,
                },
              ]}
              progressiveLoad
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
