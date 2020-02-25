import React from "react";
import { Card, Avatar, Icon } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOutUser } from "features/AuthPage/actions/auth.actions";

const { Meta } = Card;

function UserMenuDropdown({ togglePopover }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    togglePopover();
    dispatch(logOutUser());
  };

  return (
    <Card
      style={{ width: 300, padding: 0, margin: 0 }}
      bordered={false}
      actions={[
        <Link key="user" to="/account" onClick={togglePopover}>
          <Icon type="user" />
          &nbsp;Account
        </Link>,
        <div onClick={handleLogout}>
          <Icon type="logout" key="logout" /> &nbsp;Logout
        </div>
      ]}
    >
      <Meta
        avatar={<Avatar size={64} icon="user" />}
        title="email@address.com"
        description="Administrator"
      />
    </Card>
  );
}

export default UserMenuDropdown;
