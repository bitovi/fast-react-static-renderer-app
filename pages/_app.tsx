import Layout from "@shared/components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
