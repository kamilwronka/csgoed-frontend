import React from "react";
import { Menu, Icon, Layout, Avatar, Button } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  CodeOutlined
} from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { get } from "lodash";

import { logOutUser } from "features/AuthPage/actions/auth.actions";
import { useUserData } from "hooks";

const { Sider } = Layout;

function SiderMenu() {
  const { mobile, setMobile, siderOpen, disableSider } = useLayout();
  const dispatch = useDispatch();
  const { data: userData } = useUserData();

  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  const defaultSelectedItem = pathname;

  return (
    <OutsideClickHandler onOutsideClick={disableSider} display="contents">
      <Sider
        collapsed={mobile && !siderOpen}
        style={{
          background: "#fff",
          zIndex: 10,
          boxShadow: mobile
            ? `10px 0px ${window.innerWidth}px 0px rgba(0,0,0,1)`
            : "",
          height: "100vh",
          overflowY: "auto"
        }}
        width={250}
        breakpoint={"xs"}
        collapsedWidth={mobile ? 0 : 80}
        onBreakpoint={setMobile}
        trigger={null}
        className="custom"
      >
        <div>
          {mobile && (
            <div
              style={{
                margin: 16,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
              onClick={() => {
                disableSider();
                push("/account");
              }}
            >
              <Avatar size={64} icon="user" />
              <h4 style={{ margin: "8px 0 0 0" }}>{get(userData, "email")}</h4>
              <span>Administrator</span>
            </div>
          )}
          <Menu defaultSelectedKeys={defaultSelectedItem} mode="inline">
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
        </div>
        {mobile && (
          <Button
            style={{ margin: 50 }}
            onClick={handleLogout}
            type="danger"
            icon="logout"
          >
            {t("common.logout")}
          </Button>
        )}
      </Sider>
    </OutsideClickHandler>
  );
}

export default SiderMenu;
