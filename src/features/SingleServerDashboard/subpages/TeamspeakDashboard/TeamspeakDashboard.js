import React, { useEffect } from "react";
import { Tabs, Typography, Breadcrumb } from "antd";
import { useLocation, useHistory, useParams, Link } from "react-router-dom";

import { parse, stringify } from "qs";

import SummarySubpage from "./components/SummarySubpage";
import ConfigSubpage from "./components/ConfigSubpage";
import RolesSubpage from "./components/RolesSubpage";
import { useDispatch } from "react-redux";

import { fetchServerData } from "../../actions/singleServer.actions";

const { TabPane } = Tabs;
const { Title } = Typography;

const SUBPAGES = {
  CONFIG: "Config",
  SUMMARY: "Summary",
  ROLES: "Roles"
};

function TeamspeakDashboard() {
  const { pathname } = useLocation();
  const { view, name } = parse(window.location.search.substr(1));
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchServerData(id));
    document.title = `${name} - csgoed.com`;
  }, [dispatch, id, name]);

  const handleTabChange = tab => {
    const query = { ...parse(window.location.search.substr(1)), view: tab };

    push(pathname + "?" + stringify(query));
  };

  return (
    <div>
      <Title level={3}>{name}</Title>
      <Breadcrumb style={{ paddingBottom: 24 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/servers">Servers</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="card">
        <Tabs
          defaultActiveKey={view ? view : SUBPAGES.SUMMARY.toLowerCase()}
          tabPosition={"top"}
          animated={false}
          style={{ minHeight: 320, padding: 24 }}
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
    </div>
  );
}

export default TeamspeakDashboard;
