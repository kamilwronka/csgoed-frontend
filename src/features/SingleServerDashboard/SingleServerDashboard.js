import React from "react";

import TeamspeakDashboard from "./subpages/TeamspeakDashboard/TeamspeakDashboard";
import { useParams } from "react-router-dom";

function SingleServerDashboard() {
  const { game } = useParams();

  const renderSubpage = game => {
    switch (game) {
      case "teamspeak":
        return <TeamspeakDashboard />;
      default:
        return null;
    }
  };

  return <div>{renderSubpage(game)}</div>;
}

export default SingleServerDashboard;
