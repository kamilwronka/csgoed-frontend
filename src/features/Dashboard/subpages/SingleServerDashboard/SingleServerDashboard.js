import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "use-socketio";

function SingleServerDashboard() {
  const { id } = useParams();
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit("singleServerConnection", { id });
  }, [socket, id]);

  const doSumting = () => {
    socket.emit("doSumting");
  };

  return <div onClick={doSumting}>dupa</div>;
}

export default SingleServerDashboard;
