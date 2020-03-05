import React from "react";
import { parse } from "qs";

import TeamspeakDashboard from "./subpages/TeamspeakDashboard/TeamspeakDashboard";

function SingleServerDashboard() {
  const { game } = parse(window.location.search.substr(1));

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
