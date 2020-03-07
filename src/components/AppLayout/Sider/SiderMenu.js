import React from "react";
import { Menu, Layout, Typography, Avatar } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  CodeOutlined,
  PlayCircleFilled
} from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";
import { useDispatch } from "react-redux";
import { get } from "lodash";

import packagejson from "../../../../package.json";

import { logOutUser } from "features/AuthPage/actions/auth.actions";
import { useUserData } from "hooks";

const { Sider } = Layout;
const { Text } = Typography;

function SiderMenu({ style }) {
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
    <Sider
      style={style}
      width={250}
      breakpoint={"xs"}
      collapsedWidth={mobile ? 0 : 80}
      onBreakpoint={setMobile}
      trigger={null}
      className="custom"
      theme="dark"
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
        <div
          style={{
            height: 64,
            background: "rgba(255,255,255,0.05)",
            marginBottom: 20,
            boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.5)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            lineHeight: 64,
            fontSize: "1.4rem",
            paddingLeft: 24
          }}
        >
          <PlayCircleFilled style={{ fontSize: "1.6rem" }} />
          &nbsp; csgo'ed
        </div>
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
      </div>
      <Text style={{ color: "#aaa", textAlign: "center" }} type="secondary">
        version: {packagejson.version} @ csgoed.com
      </Text>
    </Sider>
    // </OutsideClickHandler>
  );
}

export default SiderMenu;
