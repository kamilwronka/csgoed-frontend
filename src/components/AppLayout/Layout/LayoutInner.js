import React from "react";
import { Layout as AntdLayout, Icon } from "antd";

import SiderMenu from "../Sider/SiderMenu";
import ContentLayout from "../ContentLayout/ContentLayout";
import Header from "../Header/Header";
import useLayout from "hooks/useLayout";

function MobileLayout({ children }) {
  const { toggleSider, siderOpen } = useLayout();

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <SiderMenu />
      <AntdLayout>
        <Header />
        <ContentLayout>{children}</ContentLayout>
        <div
          onClick={toggleSider}
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            background: "#001529",
            height: 64,
            width: 64,
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // marginLeft: 16,
            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.6)"
          }}
        >
          <Icon
            className="trigger"
            type={!siderOpen ? "menu" : "close"}
            style={{ color: "#fff" }}
          />
        </div>
      </AntdLayout>
    </AntdLayout>
  );
}

function DesktopLayout({ children }) {
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Header />

      <AntdLayout>
        <SiderMenu />
        <ContentLayout>{children}</ContentLayout>
      </AntdLayout>
    </AntdLayout>
  );
}

function LayoutInner({ children }) {
  const { mobile } = useLayout();

  return mobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}

export default LayoutInner;
