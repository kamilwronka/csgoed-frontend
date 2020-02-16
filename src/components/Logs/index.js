import React, { useState, useRef, useEffect } from "react";
import { useSocket } from "use-socketio";
import { isEmpty } from "lodash";
import { format } from "date-fns";

function Logs({ message }) {
  const [logs, setLogs] = useState([]);
  const logsRef = useRef(null);

  useSocket(message, log => {
    setLogs(logs => [...logs, log]);
  });

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div>
      <p>Server logs:</p>
      <div
        ref={logsRef}
        style={{
          width: "100%",
          // margin: "0 auto 0 auto",
          height: 400,
          maxHeight: 400,
          color: "#fff",
          background: "#000",
          padding: 10,
          fontFamily: "consolas",
          overflowY: "scroll"
        }}
      >
        {!isEmpty(logs)
          ? logs.map((log, i) => (
              <p style={{ margin: 0, padding: 0 }} key={i}>
                >> {log}
              </p>
            ))
          : ">> Waiting for logs..."}
      </div>
    </div>
  );
}

export default Logs;
