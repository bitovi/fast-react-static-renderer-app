import type { FC } from "react"

import Header from "./components/Header"

const Layout: FC<{ children }> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default Layout
