import React from "react";
import { Tabs, Card, Row, Col } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import SignInTab from "./components/SignIn/SignInTab";
import SignUpTab from "./components/SignUp/SingUpTab";
import { clearError } from "./actions/auth.actions";

const { TabPane } = Tabs;

function AuthPage() {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSwitchTab = tab => {
    dispatch(clearError());
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
      <Col xs={22} md={16} lg={14} xl={10} xxl={8}>
        <div className="card" style={{ padding: 24 }}>
          <Tabs
            animated
            defaultActiveKey={defaultActiveKey}
            onChange={onSwitchTab}
            tabPosition="top"
          >
            <TabPane tab={t("common.signIn")} key="signin">
              <SignInTab />
            </TabPane>
            <TabPane tab={t("common.signUp")} key="signup">
              <SignUpTab />
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
}

export default AuthPage;
