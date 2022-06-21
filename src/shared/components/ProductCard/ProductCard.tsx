import React, { FC } from "react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentfulImage from "../ContentfulImage";
import styles from "./ProductCard.module.css";

import { Product } from "../../types";

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const truncateString = (text) => {
    return text?.length > 100 ? `${text.substr(0, 100)}...` : text;
  };
  return (
    <div>
      <div className={styles.productCard}>
        <Link href={`/products/${product.slug}`}>
          <a>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>${product.basePrice / 100}</p>
            {product.image && (
              <ContentfulImage
                src={product.image.url}
                alt={product.image.title || product.name}
                width={product.image.width}
                height={product.image.height}
                sources={[
                  {
                    breakpointMax: "480px",
                    width: 400,
                    quality: 75,
                  },
                  {
                    breakpointMin: "481px",
                    breakpointMax: "1200px",
                    width: 450,
                    quality: 75,
                  },
                  {
                    breakpointMin: "1201px",
                    width: 500,
                    quality: 75,
                  },
                ]}
                progressiveLoad
              />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.productDescription}>
        {product.description &&
          documentToReactComponents(product.description.json, {
            renderText: (text) => truncateString(text),
          })}
      </div>
    </div>
  );
};

export default ProductCard;
