import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { get } from "lodash";

import { signInUser } from "features/AuthPage/actions/auth.actions";
import { useAuthData } from "hooks";

const INITIAL_FORM_VALUES = {
  email: "kaam@kamil.pl",
  password: "password"
};

function SignInTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const authData = useAuthData();
  const location = useLocation();

  const token = get(authData, "data.token");

  const onSubmit = values => {
    dispatch(signInUser(values));
  };

  useEffect(() => {
    if (token) {
      const desiredUrl = location.search.redirect || "/dashboard/home";
      history.push(desiredUrl);
    }
  }, [token, history, location]);

  return (
    <Formik onSubmit={onSubmit} initialValues={INITIAL_FORM_VALUES}>
      {({ handleChange, handleSubmit, values }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Item label={t("common.Email")}>
              <Input
                name="email"
                onChange={handleChange}
                type="text"
                value={values.email}
              />
            </Form.Item>
            <Form.Item label={t("common.Password")}>
              <Input
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                {t("common.SignIn")}
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignInTab;
