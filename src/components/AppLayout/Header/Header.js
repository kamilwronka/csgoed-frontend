import React from "react";
import { Layout, Icon } from "antd";

import UserMenu from "components/UserMenu/UserMenu";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const { Header: AntdHeader } = Layout;

function Header() {
  const { mobile } = useLayout();
  const { t } = useTranslation();
  const { pathname } = useLocation();

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
        <Icon
          style={{ marginRight: 10 }}
          type={t(`icons.${pathname.substr(1)}`)}
        />
        {t(`menu.${pathname.substr(1)}`)}
      </div>
      {!mobile && <UserMenu />}
    </AntdHeader>
  );
}

export default Header;
