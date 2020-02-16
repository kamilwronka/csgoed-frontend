import React from "react";
import { Menu, Dropdown, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import { useSocket } from "use-socketio";

function ManageServerDropdown({ id, name, state }) {
  const { socket } = useSocket();

  function handleDelete() {
    socket.emit("deleteServer", id);
  }

  function handleStop() {
    socket.emit("stopServer", id);
  }

  function handleStart() {
    socket.emit("startServer", id);
  }

  function handleRestart() {
    socket.emit("restartServer", id);
  }

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1">
        <Icon type="edit" />
        <Link
          style={{ display: "inline-block" }}
          to={{ pathname: `/servers/${id}` }}
        >
          Edit
        </Link>
      </Menu.Item>
      {state === "running" ? (
        <Menu.Item key="2" onClick={handleStop}>
          <Icon type="pause" />
          Stop
        </Menu.Item>
      ) : (
        <Menu.Item key="2" onClick={handleStart}>
          <Icon type="caret-right" />
          Start
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleRestart}>
        <Icon type="refresh" />
        Restart
      </Menu.Item>
      <Menu.Item key="4" onClick={handleDelete}>
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
