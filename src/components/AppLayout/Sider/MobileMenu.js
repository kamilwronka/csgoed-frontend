import React from "react";
import { Menu, Avatar, Drawer, Button } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  CodeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";
import { get } from "lodash";

import { useUserData } from "hooks";
import useAuth from "hooks/useAuth";

function MobileMenu({ style, onClose, visible }) {
  const { mobile, disableSider } = useLayout();
  const { data: userData } = useUserData();
  const { logout } = useAuth();

  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleLogout = () => {
    logout();
  };

  const defaultSelectedItem = pathname;

  return (
    <Drawer
      onClose={onClose}
      visible={visible}
      placement="left"
      bodyStyle={{ background: "#001529", padding: 0, margin: 0 }}
    >
      {mobile && (
        <div
          style={{
            margin: 16,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            disableSider();
            push("/account");
          }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <h4 style={{ margin: "8px 0 0 0", color: "#fff" }}>
            {get(userData, "email")}
          </h4>
          <span style={{ color: "#fff" }}>Administrator</span>
          <Button
            style={{ marginTop: 12 }}
            type="danger"
            onClick={handleLogout}
          >
            {t("common.logout")}
          </Button>
        </div>
      )}
      <Menu
        theme="dark"
        defaultSelectedKeys={defaultSelectedItem}
        mode="inline"
        selectedKeys={defaultSelectedItem}
      >
        <Menu.Item key="/dashboard">
          <Link to="/dashboard" onClick={disableSider}>
            <DashboardOutlined />
            <span>{t("menu.dashboard")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/servers">
          <Link to="/servers" onClick={disableSider}>
            <UnorderedListOutlined />
            <span>{t("menu.servers")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/payments">
          <Link to="/payments" onClick={disableSider}>
            <CreditCardOutlined />
            <span>{t("menu.payments")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/developers">
          <Link to="/developers" onClick={disableSider}>
            <CodeOutlined />
            <span>{t("menu.developers")}</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Drawer>
  );
}

export default MobileMenu;
