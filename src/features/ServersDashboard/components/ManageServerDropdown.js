import React from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  EditOutlined,
  PauseOutlined,
  CaretRightOutlined,
  SyncOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSocket } from "use-socketio";

function ManageServerDropdown({ id, name, state, game }) {
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
        <EditOutlined />
        <Link
          style={{ display: "inline-block" }}
          to={{
            pathname: `/servers/${game}/${id}?name=${name}&view=summary`
          }}
        >
          Edit
        </Link>
      </Menu.Item>
      {state === "running" ? (
        <Menu.Item key="2" onClick={handleStop}>
          <PauseOutlined />
          Stop
        </Menu.Item>
      ) : (
        <Menu.Item key="2" onClick={handleStart}>
          <CaretRightOutlined />
          Start
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleRestart}>
        <SyncOutlined />
        Restart
      </Menu.Item>
      <Menu.Item key="4" onClick={handleDelete}>
        <DeleteOutlined />
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button>Manage</Button>
    </Dropdown>
  );
}

export default ManageServerDropdown;
