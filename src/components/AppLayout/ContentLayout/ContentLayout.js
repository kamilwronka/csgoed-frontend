import React from "react";
import { Layout } from "antd";
import useLayout from "hooks/useLayout";

const { Content } = Layout;

function ContentLayout({ children }) {
  const { mobile, siderOpen } = useLayout();

  return (
    <Layout>
      <Content style={{ margin: mobile ? 0 : 20 }}>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: 480,
            position: siderOpen ? "fixed" : "relative",
            width: mobile ? window.innerWidth : "100%"
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}

export default ContentLayout;
