import React from "react";
import { Layout as AntdLayout } from "antd";

import SiderMenu from "../Sider/SiderMenu";
import ContentLayout from "../ContentLayout/ContentLayout";

function Layout({ children }) {
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <SiderMenu />
      <ContentLayout>{children}</ContentLayout>
    </AntdLayout>
  );
}

export default Layout;
