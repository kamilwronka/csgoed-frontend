import React from "react";
import { Layout } from "antd";

import ActivateEmailNotification from "../ActivateEmailNotification/ActivateEmailNotification";

const { Content } = Layout;

function ContentLayout({ children, padding = 24 }) {
  console.log(padding);
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
          <div style={{ padding: !padding || padding === 0 ? padding : 24 }}>
            {children}
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default ContentLayout;
