import React, { useState } from "react";
import { Input, Button } from "antd";
import { useSocket } from "use-socketio";
import { openNotificationWithIcon } from "helpers/openNotification";
import { useParams } from "react-router-dom";

function CSGODashboard() {
  const [value, setValue] = useState("");
  const { id } = useParams();

  const { socket } = useSocket("csgoInstallPlugin", message => {
    openNotificationWithIcon("success", "Success!", message, 3);
  });

  const handlePluginInstall = () => {
    console.log(id, value);
    socket.emit("csgoInstallPlugin", { id: id.split("?")[0], url: value });
  };

  return (
    <>
      <Input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button type="primary" onClick={handlePluginInstall}>
        Install plugin
      </Button>
    </>
  );
}

export default CSGODashboard;
