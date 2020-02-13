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

  const renderSubpage = (subpage, props) => {
    switch (subpage) {
      case SUBPAGES.SERVERS:
        return <ServersDashboard {...props} />;
      case SUBPAGES.HOME:
      default:
        return <div>home</div>;
    }
  };

  return <Layout>{renderSubpage(subpage)}</Layout>;
}

export default Dashboard;
