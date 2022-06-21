import React, { FC } from "react";
import "lazysizes";

function contentfulLoader(
  src: string,
  quality: number,
  width: number,
  format: string
): string {
  const params = ["w=" + width];

  if (quality) {
    params.push("q=" + quality);
  }

  if (format) {
    params.push("fm=" + format);
  }

  return `${src}?${params.join("&")}`;
}

const buildMediaQuery = (min: string, max: string): string => {
  let mediaQuery = "";
  if (min) {
    mediaQuery += `(min-width: ${min})`;
  }

  if (min && max) {
    mediaQuery += " and ";
  }

  if (max) {
    mediaQuery += `(max-width: ${max})`;
  }

  return mediaQuery;
};

export type ImageSource = {
  width: number;
  quality?: number;
  breakpointMax?: string;
  breakpointMin?: string;
};

const ContentfulImage: FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  sources: ImageSource[];
  progressiveLoad: boolean;
}> = ({ src, alt, width, height, sources, progressiveLoad }) => {
  return (
    <picture>
      {sources?.map((source) => (
        <React.Fragment key={source.width}>
          <source
            type="image/webp"
            media={buildMediaQuery(source.breakpointMin, source.breakpointMax)}
            srcSet={
              progressiveLoad
                ? contentfulLoader(src, 50, source.width / 10, "webp")
                : contentfulLoader(
                    src,
                    source.quality | 75,
                    source.width,
                    "webp"
                  )
            }
            data-srcset={contentfulLoader(
              src,
              source.quality | 75,
              source.width,
              "webp"
            )}
          />
          <source
            type="image/png"
            media={buildMediaQuery(source.breakpointMin, source.breakpointMax)}
            srcSet={
              progressiveLoad
                ? contentfulLoader(src, 50, source.width / 10, "png")
                : contentfulLoader(
                    src,
                    source.quality | 75,
                    source.width,
                    "png"
                  )
            }
            data-srcset={contentfulLoader(
              src,
              source.quality | 75,
              source.width,
              "png"
            )}
          />
        </React.Fragment>
      ))}

      <img
        src={src}
        width={width}
        height={height}
        style={{ width: "100%", height: "auto" }}
        alt={alt}
        className="lazyload"
      />
    </picture>
  );
};

export default ContentfulImage;
