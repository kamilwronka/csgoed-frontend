import React, { useState, useEffect } from "react";
import MainSocketContext from "contexts/MainSocketContext";
import socketClient from "socket.io-client";

const SocketProvider = props => {
  const [value, setValue] = useState(null);

  useEffect(() => setValue(socketClient(props.url)), [props.url]);

  console.log(value);

  return (
    <MainSocketContext.Provider value={value}>
      {props.children}
    </MainSocketContext.Provider>
  );
};

export default SocketProvider;
