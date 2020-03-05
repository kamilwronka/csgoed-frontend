import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "use-socketio";
import { Input, Button } from "antd";
import { openNotificationWithIcon } from "helpers/openNotification";

function SingleServerDashboard() {
  const { id } = useParams();
  const [token, setToken] = useState(null);
  const inputRef = useRef(null);

  const { socket } = useSocket("ts3TokenRetrieve", setToken);

  const handleTokenRetrieving = () => {
    socket.emit("ts3TokenRetrieve", id);
  };

  const handleCopy = e => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      openNotificationWithIcon("success", "Copied!", "", 3000);
    }
  };

  return (
    <div>
      <p>Admin token:</p>
      <Input
        ref={inputRef}
        value={token ? token : "1231****************Swg"}
        contentEditable={false}
      />
      {token && (
        <Button type="primary" onClick={handleCopy}>
          Copy
        </Button>
      )}
      <Button type="primary" onClick={handleTokenRetrieving}>
        Retrieve token
      </Button>
    </div>
  );
}

export default SingleServerDashboard;
