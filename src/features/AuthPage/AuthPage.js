import React from "react";
import { Tabs, Card, Row, Col } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SignInTab from "./components/SignIn/SignInTab";
import SignUpTab from "./components/SignUp/SingUpTab";

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
    <Row
      justify="center"
      type="flex"
      align="middle"
      style={{ marginTop: "50px" }}
    >
      <Col xs={22} md={18} lg={12}>
        <Card>
          <Tabs
            animated
            defaultActiveKey={defaultActiveKey}
            onChange={updateUrl}
            tabPosition="top"
          >
            <TabPane tab={t("common.SignIn")} key="signin">
              <SignInTab />
            </TabPane>
            <TabPane tab={t("common.SignUp")} key="signup">
              <SignUpTab />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
}

export default AuthPage;
