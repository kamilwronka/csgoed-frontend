import React from "react";
import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { logOutUser } from "features/AuthPage/actions/auth.actions";
import { useUserData } from "hooks";

const { Meta } = Card;

function UserMenuDropdown({ togglePopover }) {
  const dispatch = useDispatch();
  const { data: userData } = useUserData();

  const handleLogout = () => {
    togglePopover();
    dispatch(logOutUser());
  };

  return (
    <Card
      style={{ width: 400, padding: 0, margin: 0 }}
      bordered={false}
      actions={[
        <Link key="user" to="/account" onClick={togglePopover}>
          <UserOutlined />
          &nbsp;Account
        </Link>,
        <div key="logout" onClick={handleLogout}>
          <LogoutOutlined /> &nbsp;Logout
        </div>
      ]}
    >
      <Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={get(userData, "email")}
        description="Administrator"
      />
    </Card>
  );
}

export default UserMenuDropdown;
