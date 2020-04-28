import React, { useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Layout,
  Input as AntInput,
  Checkbox,
  Typography,
  Col,
} from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { isNil, get } from "lodash";
import { Link } from "react-router-dom";
import { WarningOutlined } from "@ant-design/icons";

import Input from "components/Input";
import FormItem from "components/FormItem";
import { signInUser } from "features/AuthPage/actions/auth.actions";
import { useAuthData } from "hooks";
import { useLocation } from "react-use";

const INITIAL_FORM_VALUES = {
  email: "kaam@kamil.pl",
  password: "password",
};

function SignInTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fetching, error } = useAuthData();
  const location = useLocation();

  useEffect(() => {
    document.title = "Sign in - csgoed.com";
  }, [location]);

  const onSubmit = (values) => {
    dispatch(signInUser(values));
  };

  return (
    <div>
      <Col offset={2} xs={20}>
        <Typography.Title level={4} style={{ padding: 0, marginBottom: 36 }}>
          Sign in to your account
        </Typography.Title>
      </Col>
      <Formik onSubmit={onSubmit} initialValues={INITIAL_FORM_VALUES}>
        {({ handleSubmit, errors, touched, submitCount }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormItem
                label={t("common.email")}
                name="email"
                validateStatus={errors.email && touched.email ? "error" : ""}
                help={errors.email && touched.email ? errors.email : ""}
              >
                <Field id="email" name="email" type="text" as={Input} />
              </FormItem>
              <FormItem
                label={t("common.password")}
                additionalLabel={<Link to="/auth/reset">Forgot password?</Link>}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                validateStatus={!isNil(error) ? "error" : ""}
                help={
                  !isNil(error) ? (
                    <>
                      <WarningOutlined />{" "}
                      {t("form.signInForm.errors.unableToSignInDesc")}
                    </>
                  ) : (
                    ""
                  )
                }
              >
                <Field
                  id="password"
                  name="password"
                  type="password"
                  as={Input}
                />
              </FormItem>
              <FormItem
                style={{ marginTop: 24 }}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Stay signed in</Checkbox>
              </FormItem>
              <FormItem style={{ marginTop: 64 }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={fetching}
                  style={{ width: "100%", height: 44 }}
                >
                  {fetching ? t("common.signingIn") : t("common.signIn")}
                </Button>
              </FormItem>
            </form>
          );
        }}
      </Formik>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 36,
          marginBottom: 12,
        }}
      >
        <p>
          Don't have an account?{" "}
          <Link to={`/auth/signup${location.search}`}>Sign up</Link>
        </p>
      </Col>
    </div>
  );
}

export default SignInTab;
