import ContentfulImage from "../ContentfulImage";
import Link from "next/link";
import { useState, useEffect, FC } from "react";
import CartIcon from "../../assets/bag.svg";
import styles from "./Header.module.css";

const Header: FC<{}> = () => {
  function generateRandomInt() {
    return Math.floor(Math.random() * 10);
  }

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(generateRandomInt());
    const interval = setInterval(() => setCartCount(generateRandomInt()), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.innerHeader}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <div>
              <ContentfulImage
                src="https://2171535.fs1.hubspotusercontent-na1.net/hubfs/2171535/Bitovi_July_2016_Theme/Images/bitovi-logo-x2.png"
                alt="site-logo"
                width={338}
                height={129}
                sources={[
                  { breakpointMax: "40em", width: 85 },
                  { breakpointMin: "40em", breakpointMax: "60em", width: 105 },
                  { breakpointMin: "61em", width: 145 },
                ]}
                progressiveLoad={false}
              />
            </div>
          </Link>
        </div>

        <div className={styles.cart}>
          <div className={styles.cartIcon}>
            <img src={CartIcon.src} alt="cart" />
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
