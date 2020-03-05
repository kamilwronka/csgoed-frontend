import React, { useState, useRef } from "react";
import { Descriptions, Tooltip, Input } from "antd";
import { SyncOutlined, CopyOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useSocket } from "use-socketio";

import { openNotificationWithIcon } from "helpers/openNotification";

function SummarySubpage({ id }) {
  const { data } = useSelector(state => state.singleServerPage);
  const labels = get(data, "Config.Labels", null);
  const [token, setToken] = useState();
  const inputRef = useRef(null);

  const { socket } = useSocket("ts3TokenRetrieve", token => {
    setToken(token);
    openNotificationWithIcon("success", "Token has been retrieved.", "", 3000);
  });

  const handleTokenRetrieving = () => {
    socket.emit("ts3TokenRetrieve", id);
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
    <div>
      <Descriptions title="Server info" bordered column={1} size="small">
        {labels && (
          <>
            <Descriptions.Item label="Name">{labels.name}</Descriptions.Item>
            <Descriptions.Item label="Game">{labels.game}</Descriptions.Item>
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
    </div>
  );
}

export default SummarySubpage;
