import React from "react";
import { Layout, Breadcrumb } from "antd";
import { useLocation, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

function ContentLayout({ children }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { id } = useParams();

  const breadcrumbs = pathname.split("/").slice(1);

  return (
    <Layout>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {breadcrumbs.map((breadcrumb, index) => {
            const url = "/" + breadcrumbs.slice(0, index + 1).join("/");

            console.log(url);

            return (
              <Breadcrumb.Item key={breadcrumb === id ? id : breadcrumb}>
                <Link to={url} disabled={index === 0}>
                  {breadcrumb === id ? id : t(`menu.${breadcrumb}`)}
                </Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}

export default ContentLayout;
