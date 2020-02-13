import React, { useState } from "react";
import { useSocket } from "use-socketio";
import { isEmpty } from "lodash";

function Logs({ message }) {
  const [logs, setLogs] = useState([]);

  useSocket(message, log => {
    setLogs(logs => [...logs, log]);
  });

  return (
    <div>
      <p>Server logs:</p>
      <div
        style={{
          width: "100%",
          // margin: "0 auto 0 auto",
          height: 400,
          oveflowY: "scroll",
          color: "#fff",
          background: "#000",
          padding: 10,
          fontFamily: "consolas"
        }}
      >
        {!isEmpty(logs)
          ? logs.map(log => <p key={log}>> {log}</p>)
          : "> Waiting for logs..."}
      </div>
    </div>
  );
}

export default Logs;
