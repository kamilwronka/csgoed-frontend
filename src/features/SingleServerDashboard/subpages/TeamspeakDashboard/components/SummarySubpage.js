import React, { useState, useRef } from "react";
import { Descriptions, Tooltip, Input, Row, Card, Col, Timeline } from "antd";
import { SyncOutlined, CopyOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useSocket } from "use-socketio";

import { openNotificationWithIcon } from "helpers/openNotification";
import { useParams } from "react-router-dom";

function SummarySubpage() {
  const { data } = useSelector(state => state.singleServerPage);
  const labels = get(data, "Config.Labels", null);
  const [token, setToken] = useState();
  const inputRef = useRef(null);
  const { id } = useParams();

  const { socket } = useSocket("ts3TokenRetrieve", token => {
    setToken(token);
    openNotificationWithIcon("success", "Token has been retrieved.", "", 3000);
  });

  const handleTokenRetrieving = () => {
    socket.emit("ts3TokenRetrieve", id.split("?")[0]);
  };

  const handleCopy = e => {
    if (!token) {
      return openNotificationWithIcon("warning", "No token", "", 3000);
    }

    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      openNotificationWithIcon("success", "Copied!", "", 3000);
    }
  };

  return (
    <>
      <Row gutter={32}>
        <Col xs={24} md={12}>
          <Descriptions title="Server info" bordered column={1} size="small">
            {labels && (
              <>
                <Descriptions.Item label="Name">
                  {labels.name}
                </Descriptions.Item>
                <Descriptions.Item label="Game">
                  {labels.game}
                </Descriptions.Item>
                <Descriptions.Item label="Server address">
                  {labels.ip + ":" + labels.serverPort} -
                  <a href={`ts3server://${labels.ip}:${labels.serverPort}`}>
                    &nbsp;connect
                  </a>
                </Descriptions.Item>
                <Descriptions.Item label="File transfer address">
                  {labels.ip + ":" + labels.fileTransferPort}
                </Descriptions.Item>
                <Descriptions.Item label="Server query address">
                  {labels.ip + ":" + labels.serverQueryPort}
                </Descriptions.Item>
                <Descriptions.Item label="Server admin token">
                  <Input
                    ref={inputRef}
                    value={token ? token : "1231****************Swg"}
                    contentEditable={false}
                    style={{ marginRight: 10, width: "100%" }}
                    addonAfter={
                      <>
                        <Tooltip title="Retrieve token">
                          <SyncOutlined
                            onClick={handleTokenRetrieving}
                            style={{
                              paddingRight: 10,
                              borderRight: "1px solid #ccc"
                            }}
                          >
                            Retrieve token
                          </SyncOutlined>
                        </Tooltip>
                        <Tooltip title="Copy token">
                          <CopyOutlined
                            onClick={handleCopy}
                            style={{ paddingLeft: 10 }}
                          >
                            Copy
                          </CopyOutlined>
                        </Tooltip>
                      </>
                    }
                  />
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Latest activity">
            <Timeline mode="left">
              <Timeline.Item label="21:37" color="red">
                Server stopped
              </Timeline.Item>
              <Timeline.Item label="13:37" color="green">
                Server started
              </Timeline.Item>
              <Timeline.Item label="04:20" color="green">
                Server created
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card></Card>
      </Row>
    </>
  );
}

export default SummarySubpage;
