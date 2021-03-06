import React, { useEffect } from "react";
import { Button, Checkbox, Typography, Col } from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";
import { Link } from "react-router-dom";
import { WarningOutlined } from "@ant-design/icons";
import * as Yup from "yup";

import Input from "components/Input";
import FormItem from "components/FormItem";
import { useLocation } from "react-use";
import useAuth from "hooks/useAuth";

const INITIAL_FORM_VALUES = {
  email: "",
  password: "",
};

function SignInTab() {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    signIn,
    state: { error, fetching },
  } = useAuth();

  const SignInSchema = Yup.object().shape({
    email: Yup.string().required(t("form.common.errors.required")),
    password: Yup.string().required(t("form.common.errors.required")),
  });

  useEffect(() => {
    document.title = t("form.signInForm.title");
  }, [location, t]);

  const onSubmit = (values) => {
    signIn(values);
  };

  console.log(fetching);

  return (
    <div>
      <Col offset={2} xs={20}>
        <Typography.Title level={4} style={{ padding: 0, marginBottom: 36 }}>
          {t("form.signInForm.header")}
        </Typography.Title>
      </Col>
      <Formik
        onSubmit={onSubmit}
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={SignInSchema}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => {
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
                additionalLabel={
                  <Link to="/auth/reset">{t("form.signInForm.forgot")}</Link>
                }
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
                <Checkbox
                  checked={values.remember}
                  onChange={(e) => setFieldValue("remember", e.target.checked)}
                >
                  {t("form.signInForm.remember")}
                </Checkbox>
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
          {t("form.common.createAccount")}{" "}
          <Link to={`/auth/signup${location.search}`}>
            {t("common.signUp")}
          </Link>
        </p>
      </Col>
    </div>
  );
}

export default SignInTab;
