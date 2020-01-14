import React from "react";
import { Tabs, Card } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SignInTab from "./components/SignIn/SignInTab";

const { TabPane } = Tabs;

function AuthPage() {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();

  const updateUrl = tab => {
    history.push(`/auth/${tab}${location.search}`);
  };

  const defaultActiveKey = params.type;

  return (
    <Card>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={updateUrl}>
        <TabPane tab={t("common.SignIn")} key="signin">
          <SignInTab />
        </TabPane>
        <TabPane tab={t("common.SignUp")} key="signup">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default AuthPage;
