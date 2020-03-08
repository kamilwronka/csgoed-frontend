import React from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout as AntdLayout } from "antd";
import SimpleBar from "simplebar-react";

import SiderMenu from "../Sider/SiderMenu";
import MobileMenu from "../Sider/MobileMenu";
import ContentLayout from "../ContentLayout/ContentLayout";
import Header from "../Header/Header";

import useLayout from "hooks/useLayout";

function MobileLayout({ children }) {
  const { toggleSider, siderOpen } = useLayout();

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <MobileMenu visible={siderOpen} onClose={toggleSider} />
      <AntdLayout>
        <Header />
        <div style={{ marginTop: 64 }}>
          <ContentLayout>{children}</ContentLayout>
        </div>
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
          {!siderOpen ? (
            <MenuOutlined className="trigger" style={{ color: "#fff" }} />
          ) : (
            <CloseOutlined className="trigger" style={{ color: "#fff" }} />
          )}
        </div>
      </AntdLayout>
    </AntdLayout>
  );
}

function DesktopLayout({ children, ...props }) {
  return (
    <AntdLayout style={{ display: "flex", flexDirection: "column" }}>
      <SimpleBar>
        <SiderMenu
          style={{
            position: "fixed",
            left: 0,
            height: "100vh",
            overflowY: "auto"
          }}
        />
      </SimpleBar>
      <Header />

      <AntdLayout style={{ marginLeft: 250, marginTop: 64 }}>
        <ContentLayout {...props}>{children}</ContentLayout>
      </AntdLayout>
    </AntdLayout>
  );
}

function LayoutInner({ children, ...props }) {
  const { mobile } = useLayout();

  return mobile ? (
    <MobileLayout {...props}>{children}</MobileLayout>
  ) : (
    <DesktopLayout {...props}>{children}</DesktopLayout>
  );
}

export default LayoutInner;
