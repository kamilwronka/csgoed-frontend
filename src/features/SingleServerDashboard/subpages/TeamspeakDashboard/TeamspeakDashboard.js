import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { parse, stringify } from "qs";

import SummarySubpage from "./components/SummarySubpage";
import ConfigSubpage from "./components/ConfigSubpage";
import useLayout from "hooks/useLayout";
import RolesSubpage from "./components/RolesSubpage";
import { useDispatch } from "react-redux";

import { fetchServerData } from "../../actions/singleServer.actions";

const { TabPane } = Tabs;

const SUBPAGES = {
  CONFIG: "Config",
  SUMMARY: "Summary",
  ROLES: "Roles"
};

function TeamspeakDashboard() {
  const { pathname, search } = useLocation();
  const { view } = parse(search.substr(1));
  const { mobile } = useLayout();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchServerData(id));
  }, [dispatch, id]);

  const handleTabChange = tab => {
    const query = { ...parse(search.substr(1)), view: tab };

    push(pathname + "?" + stringify(query));
  };

  return (
    <div>
      <Tabs
        defaultActiveKey={view ? view : SUBPAGES.SUMMARY.toLowerCase()}
        tabPosition={mobile ? "top" : "right"}
        animated={false}
        style={{ minHeight: 320 }}
        tabBarStyle={{
          width: mobile ? "100%" : 180,
          marginBottom: mobile ? 40 : 0
        }}
        onChange={handleTabChange}
      >
        <TabPane tab={SUBPAGES.SUMMARY} key={SUBPAGES.SUMMARY.toLowerCase()}>
          <SummarySubpage id={id} />
        </TabPane>
        <TabPane tab={SUBPAGES.ROLES} key={SUBPAGES.ROLES.toLowerCase()}>
          <RolesSubpage />
        </TabPane>
        <TabPane tab={SUBPAGES.CONFIG} key={SUBPAGES.CONFIG.toLowerCase()}>
          <ConfigSubpage />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TeamspeakDashboard;
