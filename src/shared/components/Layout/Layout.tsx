import type { FC } from "react"

import Header from "./components/Header"

const Layout: FC<{ children }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
