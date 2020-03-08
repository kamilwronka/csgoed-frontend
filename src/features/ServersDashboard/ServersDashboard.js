import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  notification,
  Typography,
  Breadcrumb,
  Input
} from "antd";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useHistory, Link } from "react-router-dom";
import { isEmpty } from "lodash";

import {
  fetchServers,
  deleteServer,
  filterServers
} from "./actions/servers.actions";
import AddNewServerDrawer from "./components/AddNewServerMenuForm";
import ManageServerMenu from "./components/ManageServerMenu";
import { useSocket } from "use-socketio";
import TableRow from "./components/TableRow";
import TableCell from "./components/TableCell";
import useLayout from "hooks/useLayout";

const { Title, Paragraph } = Typography;
const { Search } = Input;

function ServersDashboard() {
  const dispatch = useDispatch();
  const [drawerOpen, setModal] = useState(
    window.location.href.includes("new-server")
  );
  const { data, searchData, fetching } = useSelector(
    state => state.serversDashboard.servers
  );
  const history = useHistory();
  const { mobile } = useLayout();

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
      width: 140,
      title: "Name",
      key: "Image",
      sorter: (a, b) => a.Labels.name.localeCompare(b.Labels.name),
      render: (text, record) => (
        <Paragraph
          ellipsis={{ rows: 1, expandable: false }}
          style={{ padding: 0, margin: 0 }}
        >
          <Link
            style={{ display: "inline-block" }}
            to={{
              pathname: `/servers/${record.Labels.game}/${record.Id}?name=${record.Labels.name}&view=summary`
            }}
          >
            {record.Labels.name}
          </Link>
        </Paragraph>
      )
    },
    {
      width: 100,
      title: "Game",
      key: "Game",
      filters: [
        { text: "Teamspeak 3", value: "teamspeak" },
        { text: "CS:GO", value: "csgo" },
        { text: "Minecraft", value: "minecraft" }
      ],
      onFilter: (value, record) => record.Labels.game.indexOf(value) === 0,
      render: (text, record) => {
        return record.Labels.game;
      }
    },
    {
      width: 100,
      title: "State",
      dataIndex: "State",
      key: "State",
      filters: [
        { text: "exited", value: "exited" },
        { text: "running", value: "running" },
        { text: "created", value: "created" }
      ],
      onFilter: (value, record) => record.State.indexOf(value) === 0
    },
    { width: 200, title: "Status", dataIndex: "Status", key: "Status" },
    {
      width: 140,
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
      sorter: (a, b) => a.Created - b.Created,
      render: (text, record) => {
        const time = format(record.Created * 1000, "HH:mm", {
          locale: pl
        });
        const day = format(record.Created * 1000, "dd-MM-yyyy", {
          locale: pl
        });
        return (
          <div>
            <strong>{day}</strong> - {time}
          </div>
        );
      }
    },
    {
      width: 50,
      fixed: "right",
      title: "",
      key: "action",
      render: (text, record) => {
        return (
          <ManageServerMenu
            record={record}
            id={record.Id}
            name={record.Labels.name}
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
    document.title = "Servers console - csgoed.com";
  }, []);

  useEffect(() => {
    dispatch(fetchServers());
  }, [dispatch]);

  const handleSearch = e => {
    dispatch(filterServers(e.target.value));
  };

  return (
    <div>
      <Title level={3}>Servers console</Title>
      <Breadcrumb style={{ paddingBottom: 24 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Servers</Breadcrumb.Item>
      </Breadcrumb>
      <AddNewServerDrawer
        visible={drawerOpen}
        setVisibility={toggleAddingNewServerDrawer}
      />
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap-reverse"
        }}
      >
        <div>
          <Search
            enterButton
            style={{ width: mobile ? 200 : 300 }}
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
        <div>
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
      </div>
      <Table
        className="card"
        rowSelection
        rowKey={record => record.Id}
        dataSource={searchData ? searchData : data}
        loading={fetching}
        columns={columns}
        pagination={{ pageSize: 20 }}
        components={{ body: { row: TableRow, cell: TableCell } }}
        style={{ overflowX: "auto" }}
        scroll={{ x: 900 }}
        size="small"
      ></Table>
    </div>
  );
}

export default ServersDashboard;
