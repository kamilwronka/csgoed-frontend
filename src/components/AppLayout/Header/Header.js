import React from "react";
import { Layout, Badge, Tooltip } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  CodeOutlined,
  DesktopOutlined,
  SearchOutlined,
  BellFilled
} from "@ant-design/icons";

import UserMenu from "components/UserMenu/UserMenu";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { parse } from "qs";
import LanguageMenu from "components/LanguageMenu/LanguageMenu";
import HeaderNotifications from "components/HeaderNotifications";

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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        color: "#000",
        padding: "0 24px",
        marginLeft: 250,
        background: "#fff",
        zIndex: 10,
        boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.3)"
      }}
    >
      <div className="searchBar">
        <SearchOutlined
          style={{
            fontSize: "1.4rem",
            padding: "0 10px 0 10px",
            color: "#bbb",
            borderRight: "1px solid #bbb",
            cursor: "pointer"
          }}
        />
        <input className="search-input" placeholder="Search..." />
        {/* {getIcon(pathnameNormalized)}&nbsp;&nbsp;
        {name ? name : t(`menu.${pathnameNormalized}`)} */}
      </div>
      <div className="header-icons-holder">
        <HeaderNotifications />
        {!mobile && (
          <Tooltip title="Language">
            <div className="header-icon">
              <LanguageMenu />
            </div>
          </Tooltip>
        )}
        {!mobile && (
          <Tooltip title="Profile">
            <div className="header-icon">
              <UserMenu />
            </div>
          </Tooltip>
        )}
      </div>
    </AntdHeader>
  );
}

export default Header;
