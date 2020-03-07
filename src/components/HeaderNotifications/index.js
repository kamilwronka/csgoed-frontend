import React from "react";
import { Badge, Tooltip } from "antd";
import { BellOutlined } from "@ant-design/icons";

function HeaderNotifications() {
  return (
    <Badge count={3}>
      <Tooltip title="Notifications">
        <BellOutlined style={{ color: "#001529", fontSize: "1.6rem" }} />
      </Tooltip>
    </Badge>
  );
}

export default HeaderNotifications;
