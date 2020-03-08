import React from "react";
import { Layout } from "antd";

import ActivateEmailNotification from "../ActivateEmailNotification/ActivateEmailNotification";
import useLayout from "hooks/useLayout";

const { Content } = Layout;

function ContentLayout({ children }) {
  const { mobile } = useLayout();

  return (
    <Layout>
      <Content style={{}}>
        <div
          style={{
            background: "#f0f0f0",
            minHeight: "calc(100vh - 64px)"
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
