import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  notification,
  Typography,
  Breadcrumb,
  Input,
  Col,
  Row,
  Tooltip,
} from "antd";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useHistory, Link } from "react-router-dom";
import { isEmpty, get } from "lodash";
import {
  PauseOutlined,
  SyncOutlined,
  DeleteOutlined,
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";

import AddNewServerDrawer from "./components/AddNewServerMenuForm";
import ManageServerMenu from "./components/ManageServerMenu";
import { useSocket } from "use-socketio";
import TableRow from "./components/TableRow";
import TableCell from "./components/TableCell";
import { useDebounce } from "react-use";
import { isString } from "formik";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;
const { Search } = Input;

function ServersDashboard() {
  const { t } = useTranslation();
  const [drawerOpen, setModal] = useState(
    window.location.href.includes("new-server")
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // const [searchData, setSearchData] = useState(data);
  const history = useHistory();
  // const dataLength = get(data, "length");

  useDebounce(
    () => {
      // handleSearch(searchValue);
    },
    500,
    [searchValue]
  );

  const setupSocketEvents = (socket) => {
    // socket.on("deleteServer", (id) => {
    //   setTimeout(notification.destroy, 3000);
    // });
    // socket.on("startServer", (id) => {
    //   setTimeout(notification.destroy, 3000);
    // });
    // socket.on("startServer", (id) => {
    //   setTimeout(notification.destroy, 3000);
    // });
  };

  const { socket } = useSocket();
  setupSocketEvents(socket);

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
              pathname: `/servers/${record.Labels.game}/${record.Id}?name=${record.Labels.name}&view=summary`,
            }}
          >
            {record.Labels.name}
          </Link>
        </Paragraph>
      ),
    },
    {
      width: 100,
      title: "Game",
      key: "Game",
      filters: [
        { text: "Teamspeak 3", value: "teamspeak" },
        { text: "CS:GO", value: "csgo" },
        { text: "Minecraft", value: "minecraft" },
      ],
      onFilter: (value, record) => record.Labels.game.indexOf(value) === 0,
      render: (text, record) => {
        return record.Labels.game;
      },
    },
    {
      width: 100,
      title: "State",
      dataIndex: "State",
      key: "State",
      filters: [
        { text: "exited", value: "exited" },
        { text: "running", value: "running" },
        { text: "created", value: "created" },
      ],
      onFilter: (value, record) => record.State.indexOf(value) === 0,
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
      },
    },
    {
      width: 200,
      title: "Created",
      key: "Id",
      sorter: (a, b) => a.Created - b.Created,
      render: (text, record) => {
        const time = format(record.Created * 1000, "HH:mm", {
          locale: pl,
        });
        const day = format(record.Created * 1000, "dd-MM-yyyy", {
          locale: pl,
        });
        return (
          <div>
            <strong>{day}</strong> - {time}
          </div>
        );
      },
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
      },
    },
  ];

  const handleRefresh = () => {};

  const toggleAddingNewServerDrawer = (visibility) => {
    if (visibility === true || visibility === false) {
      visibility
        ? history.push("/servers#new-server")
        : history.push("/servers");
      return setModal(visibility);
    } else {
      setModal((state) => {
        !state ? history.push("/servers#new-server") : history.push("/servers");
        return !state;
      });
    }
  };

  useEffect(() => {
    document.title = "Servers console - csgoed.com";
  }, []);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   handleSearch(searchValue);
  //   //eslint-disable-next-line
  // }, [dataLength]);

  // function handleSearch(searchValue) {
  //   if (isString(searchValue)) {
  //     setSearchData(
  //       data
  //         ? data.filter(
  //             (value) =>
  //               value.Labels.name.toLowerCase().indexOf(searchValue) !== -1
  //           )
  //         : []
  //     );
  //   }
  // }

  const handleSelect = (_, selected, items) => {
    setSelectedItems(items);
  };

  const handleSelectAll = (_, items) => {
    setSelectedItems(items);
  };

  return (
    <div>
      <Title level={3}>Servers console</Title>
      <Breadcrumb style={{ paddingBottom: 24 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">{t("breadcrumbs.dashboard")}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("pages.serversConsolePage.header")}
        </Breadcrumb.Item>
      </Breadcrumb>
      <AddNewServerDrawer
        visible={drawerOpen}
        setVisibility={toggleAddingNewServerDrawer}
      />
      <Row
        gutter={[24, 24]}
        style={{
          marginBottom: 20,
        }}
      >
        <Col xs={24} lg={8}>
          <Search
            enterButton
            style={{ width: "100%" }}
            placeholder="Search..."
            value={searchValue}
            onChange={({ currentTarget }) => {
              setSearchValue(currentTarget.value);
            }}
            allowClear
          />
        </Col>
        <Col
          xs={24}
          lg={16}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Tooltip title="Stop all">
            <Button
              onClick={toggleAddingNewServerDrawer}
              disabled={isEmpty(selectedItems)}
              style={{ marginRight: 10, width: 44, height: 32 }}
              icon={<PauseOutlined />}
            />
          </Tooltip>
          <Tooltip title="Restart all">
            <Button
              onClick={handleRefresh}
              // loading={fetching}
              disabled={isEmpty(selectedItems)}
              style={{ marginRight: 10, width: 44, height: 32 }}
              icon={<SyncOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete all">
            <Button
              onClick={handleRefresh}
              // loading={fetching}
              disabled={isEmpty(selectedItems)}
              type="danger"
              style={{ marginRight: 10, width: 44, height: 32 }}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
          <Tooltip title="Add new server">
            <Button
              onClick={toggleAddingNewServerDrawer}
              type="primary"
              style={{ marginRight: 10, width: 44, height: 32 }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
          <Tooltip title="Refresh">
            <Button
              onClick={handleRefresh}
              // loading={fetching}
              icon={
                <UndoOutlined
                  style={{
                    transform: "rotate(45deg)",
                  }}
                />
              }
              style={{ width: 44, height: 32 }}
            />
          </Tooltip>
        </Col>
      </Row>
      <Table
        className="card"
        rowSelection={{
          fixed: true,
          type: "checkbox",
          onSelect: handleSelect,
          onSelectAll: handleSelectAll,
        }}
        rowKey={(record) => record.Id}
        // dataSource={searchData ? searchData : data}
        // loading={fetching}
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
