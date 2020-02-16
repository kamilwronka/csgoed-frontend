import React, { useState } from "react";
import { Menu, Icon, Layout } from "antd";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { logOutUser } from "features/AuthPage/actions/auth.actions";

const { Sider } = Layout;

function SiderMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const { subpage } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const defaultSelectedItem = subpage || "home";

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={defaultSelectedItem}
        mode="inline"
      >
        <Menu.Item key="home">
          <Link to="/dashboard">
            <Icon type="pie-chart" />
            <span>{t("menu.home")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="servers">
          <Link to="/servers">
            <Icon type="desktop" />
            <span>{t("menu.servers")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <Icon type="logout" />
          <span>{t("common.logout")}</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
