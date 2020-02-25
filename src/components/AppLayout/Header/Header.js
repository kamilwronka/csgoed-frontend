import React from "react";
import { Layout } from "antd";

import UserMenu from "components/UserMenu/UserMenu";
import useLayout from "hooks/useLayout";

const { Header: AntdHeader } = Layout;

function Header() {
  const { mobile } = useLayout();

  return (
    <AntdHeader
      className="header"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        color: "#fff",
        padding: "0 24px"
      }}
    >
      <div className="logo">csgoed.com</div>
      {!mobile && <UserMenu />}
    </AntdHeader>
  );
}

export default Header;
