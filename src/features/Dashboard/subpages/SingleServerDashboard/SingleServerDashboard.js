import React from "react";
import { useLocation, useParams } from "react-router-dom";
import MainSocketProvider from "providers/MainSocketProvider";

function SingleServerDashboard() {
  const { search } = useLocation();
  const { id } = useParams();

  console.log(search);

  return (
    <MainSocketProvider url={"http://195.168.95.3:5555"}>
      <div>dupa</div>
    </MainSocketProvider>
  );
}

export default SingleServerDashboard;
