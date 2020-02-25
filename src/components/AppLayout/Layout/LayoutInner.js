import React from "react";
import { Layout as AntdLayout, Affix, Button, Icon } from "antd";

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
        <Affix offsetBottom={16} style={{ width: 0 }}>
          <div
            onClick={toggleSider}
            style={{
              background: "#001529",
              height: 44,
              width: 44,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 16,
              boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.6)"
            }}
          >
            <Icon
              className="trigger"
              type={!siderOpen ? "menu" : "close"}
              style={{ color: "#fff" }}
            />
          </div>
        </Affix>
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
