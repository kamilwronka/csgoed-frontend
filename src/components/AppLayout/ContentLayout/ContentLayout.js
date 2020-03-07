import React from "react";
import { Layout } from "antd";
import useLayout from "hooks/useLayout";

import ActivateEmailNotification from "../ActivateEmailNotification/ActivateEmailNotification";

const { Content } = Layout;

function ContentLayout({ children }) {
  const { mobile, siderOpen } = useLayout();

  return (
    <Layout>
      <Content style={{}}>
        <div
          style={{
            background: "#f0f0f0",
            minHeight: "calc(100vh - 64px)",
            position: siderOpen ? "fixed" : "relative",
            width: mobile ? window.innerWidth : "100%"
          }}
        >
          <ActivateEmailNotification />
          <div style={{ padding: 24 }}>{children}</div>
        </div>
      </Content>
    </Layout>
  );
}

export default ContentLayout;
