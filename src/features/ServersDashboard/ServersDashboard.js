import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Row,
  notification,
  Col,
  Typography,
  Divider
} from "antd";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";

import { fetchServers, deleteServer } from "./actions/servers.actions";
import AddNewServerDrawer from "./components/AddNewServerMenuForm";
import ManageServerDropdown from "./components/ManageServerDropdown";
import { useSocket } from "use-socketio";

const { Title } = Typography;

function ServersDashboard() {
  const dispatch = useDispatch();
  const [drawerOpen, setModal] = useState(
    window.location.href.includes("new-server")
  );
  const { data, fetching } = useSelector(
    state => state.serversDashboard.servers
  );
  const history = useHistory();

  useSocket("deleteServer", id => {
    dispatch(deleteServer(id));
    setTimeout(notification.destroy, 3000);
  });

  useSocket("startServer", id => {
    setTimeout(notification.destroy, 3000);
  });

  useSocket("stopServer", id => {
    setTimeout(notification.destroy, 3000);
  });

  const columns = [
    {
      width: 150,
      title: "Name",
      key: "Image",
      render: (text, record) => {
        return record.Names[0].slice(1);
      }
    },
    { width: 150, title: "State", dataIndex: "State", key: "State" },
    { width: 200, title: "Status", dataIndex: "Status", key: "Status" },
    {
      width: 150,
      title: "Ip address",
      key: "Ip",
      render: (text, record) => {
        return !isEmpty(record.Ports)
          ? `${record.Ip}:${record.Labels.serverPort}`
          : "Not assigned";
      }
    },
    {
      width: 200,
      title: "Created",
      key: "Id",
      render: (text, record) => {
        return format(record.Created * 1000, "HH:mm dd-MM-yyyy", {
          locale: pl
        });
      }
    },
    {
      width: 100,
      fixed: "right",
      title: "Actions",
      key: "action",
      render: (text, record) => {
        return (
          <ManageServerDropdown
            record={record}
            id={record.Id}
            name={record.Names[0].slice(1)}
            state={record.State}
            game={record.Labels.game}
          />
        );
      }
    }
  ];

  const handleRefresh = () => {
    dispatch(fetchServers());
  };

  const toggleAddingNewServerDrawer = visibility => {
    if (visibility === true || visibility === false) {
      visibility
        ? history.push("/servers#new-server")
        : history.push("/servers");
      return setModal(visibility);
    } else {
      setModal(state => {
        !state ? history.push("/servers#new-server") : history.push("/servers");
        return !state;
      });
    }
  };

  useEffect(() => {
    dispatch(fetchServers());
  }, [dispatch]);

  return (
    <div>
      <Row>
        <Col
          xs={24}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Title level={3}>Servers console</Title>
        </Col>
        <Divider style={{ background: "#ccc", marginTop: 0 }} />
      </Row>
      <AddNewServerDrawer
        visible={drawerOpen}
        setVisibility={toggleAddingNewServerDrawer}
      />
      <div style={{ marginBottom: 20 }}>
        <Button
          onClick={toggleAddingNewServerDrawer}
          type="primary"
          style={{ marginRight: 10 }}
        >
          Add new server
        </Button>
        <Button onClick={handleRefresh} loading={fetching}>
          Refresh
        </Button>
      </div>
      <Table
        rowKey={record => record.Id}
        dataSource={data}
        loading={fetching}
        columns={columns}
        // style={{ overflowX: "auto" }}
        scroll={{ x: 850 }}
        size="middle"
      ></Table>
    </div>
  );
}

export default ServersDashboard;
