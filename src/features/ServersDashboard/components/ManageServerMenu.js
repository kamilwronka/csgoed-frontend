import React from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  EditOutlined,
  PauseOutlined,
  CaretRightOutlined,
  SyncOutlined,
  DeleteOutlined,
  EllipsisOutlined
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
      <div
        style={{
          width: 38,
          display: "flex",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        <EllipsisOutlined
          style={{ transform: "rotate(90deg)", fontSize: "1.2rem" }}
        />
      </div>
    </Dropdown>
  );
}

export default ManageServerDropdown;
