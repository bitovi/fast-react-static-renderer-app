import type { FC } from "react"
import type { AppProps } from "next/app"

import Layout from "@shared/components/Layout"

import "@shared/components/Layout/globals.css"

const FRSRApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default FRSRApp
