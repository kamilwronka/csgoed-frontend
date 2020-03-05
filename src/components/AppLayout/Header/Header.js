import React from "react";
import { Layout } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  CodeOutlined,
  DesktopOutlined
} from "@ant-design/icons";

import UserMenu from "components/UserMenu/UserMenu";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { parse } from "qs";

const { Header: AntdHeader } = Layout;

function Header() {
  const { mobile } = useLayout();
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const { id } = useParams();
  const pathnameNormalized = pathname.split("/")[1];
  const { name } = parse(search.substr(1));

  const getIcon = name => {
    switch (name) {
      case "dashboard":
        return <DashboardOutlined />;
      case "servers":
        return id ? <DesktopOutlined /> : <UnorderedListOutlined />;
      case "payments":
        return <CreditCardOutlined />;
      case "developers":
        return <CodeOutlined />;
      default:
        return null;
    }
  };

  return (
    <AntdHeader
      className="header"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        color: "#fff",
        padding: "0 24px",
        width: mobile ? window.innerWidth : "100%"
      }}
    >
      <div className="logo">
        {getIcon(pathnameNormalized)}&nbsp;&nbsp;
        {name ? name : t(`menu.${pathnameNormalized}`)}
      </div>
      {!mobile && <UserMenu />}
    </AntdHeader>
  );
}

export default Header;
