import React from "react";
import { Layout } from "components/AppLayout";
import { useParams } from "react-router-dom";

import ServersDashboard from "./subpages/ServersDashboard/ServersDashboard";

const SUBPAGES = {
  SERVERS: "servers",
  HOME: "home"
};

function Dashboard() {
  const { subpage } = useParams();

  const renderSubpage = subpage => {
    switch (subpage) {
      case SUBPAGES.SERVERS:
        return <ServersDashboard />;
      case SUBPAGES.HOME:
      default:
        return <div>home</div>;
    }
  };

  console.log(subpage);

  return <Layout>{renderSubpage(subpage)}</Layout>;
}

export default Dashboard;
