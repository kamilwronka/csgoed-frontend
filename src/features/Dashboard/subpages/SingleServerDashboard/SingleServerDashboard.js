import React from "react";
import { useLocation } from "react-router-dom";

function SingleServerDashboard() {
  const { search } = useLocation();

  console.log(search);

  return <div>server id jakies tam</div>;
}

export default SingleServerDashboard;
