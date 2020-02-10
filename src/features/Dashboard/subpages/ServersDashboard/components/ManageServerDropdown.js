import React from "react";
import { Menu, Dropdown, Button, Icon } from "antd";
import { Link } from "react-router-dom";

function ManageServerDropdown({ id, name }) {
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1">
        <Icon type="edit" />
        <Link to={`/dashboard/servers/${name}`}>Edit</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="stop" />
        Stop
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="delete" />
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button type="primary">
        Manage <Icon type="down" />
      </Button>
    </Dropdown>
  );
}

export default ManageServerDropdown;
