import React from "react";

import TeamspeakDashboard from "./subpages/TeamspeakDashboard/TeamspeakDashboard";
import { useParams } from "react-router-dom";
import CSGODashboard from "./subpages/CSGODashboard/CSGODashboard";

function SingleServerDashboard() {
  const { game } = useParams();

  const renderSubpage = game => {
    switch (game) {
      case "teamspeak":
        return <TeamspeakDashboard />;
      case "csgo":
        return <CSGODashboard />;
      default:
        return null;
    }
  };

  return <div>{renderSubpage(game)}</div>;
}

export default SingleServerDashboard;
