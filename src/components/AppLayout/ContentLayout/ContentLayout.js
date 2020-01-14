import React from "react";
import { Layout, Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import capitalizeFirstLetter from "helpers/capitalizeFirstLetter";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

function ContentLayout({ children }) {
  const { subpage } = useParams();
  const { t } = useTranslation();
  const breadcrumbName = capitalizeFirstLetter(subpage);

  return (
    <Layout>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item key="dashboard">
            {t("common.Dashboard")}
          </Breadcrumb.Item>
          <Breadcrumb.Item key={subpage}>
            {t(`menu.${breadcrumbName}`)}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}

export default ContentLayout;
