import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row } from "antd";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useHistory } from "react-router-dom";

import { fetchServers } from "../../actions/servers.actions";
import AddNewServerModal from "./components/AddNewServerModal";
import ManageServerDropdown from "./components/ManageServerDropdown";

function ServersDashboard() {
  const dispatch = useDispatch();
  const [modalOpen, setModal] = useState(
    window.location.href.includes("new-server")
  );
  const { data, fetching } = useSelector(state => state.dashboardPage.servers);
  const history = useHistory();

  const columns = [
    {
      title: "Name",
      key: "Image",
      render: (text, record) => {
        return record.Names[0].slice(1);
      }
    },
    { title: "State", dataIndex: "State", key: "State" },
    { title: "Status", dataIndex: "Status", key: "Status" },
    {
      title: "Ip address",
      key: "Ip",
      render: (text, record) => {
        return "192.168.95.3:" + record.Ports[0].PublicPort;
      }
    },
    {
      title: "Created",
      key: "Id",
      render: (text, record) => {
        return format(record.Created * 1000, "HH:mm dd-MM-yyyy", {
          locale: pl
        });
      }
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        return (
          <ManageServerDropdown
            record={record}
            id={record.Id}
            name={record.Names[0].slice(1)}
          />
        );
      }
    }
  ];

  const handleRefresh = () => {
    dispatch(fetchServers());
  };

  const toggleAddingNewServerModal = visibility => {
    if (visibility === true || visibility === false) {
      visibility
        ? history.push("/dashboard/servers#new-server")
        : history.push("/dashboard/servers");
      return setModal(visibility);
    } else {
      setModal(state => {
        !state
          ? history.push("/dashboard/servers#new-server")
          : history.push("/dashboard/servers");
        return !state;
      });
    }
  };

  useEffect(() => {
    dispatch(fetchServers());
  }, [dispatch]);

  return (
    <div>
      <AddNewServerModal
        visible={modalOpen}
        setVisibility={toggleAddingNewServerModal}
      />
      <Row style={{ margin: "0 0 10px 0" }} justify="end" type="flex">
        <Button
          onClick={toggleAddingNewServerModal}
          type="primary"
          style={{ marginRight: 10 }}
        >
          Add new server
        </Button>
        <Button onClick={handleRefresh} loading={fetching}>
          Refresh
        </Button>
      </Row>
      <Row>
        <Table dataSource={data} loading={fetching} columns={columns}></Table>
      </Row>
    </div>
  );
}

export default ServersDashboard;
