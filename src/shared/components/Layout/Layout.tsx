import React, { FC } from "react";
import Header from "../Header";

const Layout: FC<{ children }> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
