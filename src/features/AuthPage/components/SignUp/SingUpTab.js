import React, { useEffect } from "react";
import { Button, Col, Typography, Checkbox } from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { isNil } from "lodash";
import { Link } from "react-router-dom";
import { useLocation } from "react-use";

import { SIGN_UP_FORM_CONFIG } from "config";
import { equalTo } from "helpers/equalTo";
import FormItem from "components/FormItem";
import Input from "components/Input";
import useAuth from "hooks/useAuth";

const INITIAL_FORM_VALUES = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

Yup.addMethod(Yup.string, "equalTo", equalTo);

function SignUpTab() {
  const { t } = useTranslation();
  const { signUp, fetching, error } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = t("form.signUpForm.title");
  }, [t]);

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(
        SIGN_UP_FORM_CONFIG.nameMinChars,
        t("form.signUpForm.errors.tooShortName")
      )
      .max(
        SIGN_UP_FORM_CONFIG.nameMaxChars,
        t("form.signUpForm.errors.tooLongName")
      )
      .required(t("form.common.errors.required")),
    lastName: Yup.string()
      .min(
        SIGN_UP_FORM_CONFIG.nameMinChars,
        t("form.signUpForm.errors.tooShortName")
      )
      .max(
        SIGN_UP_FORM_CONFIG.nameMaxChars,
        t("form.signUpForm.errors.tooLongName")
      )
      .required(t("form.common.errors.required")),
    email: Yup.string()
      .email(t("form.signUpForm.errors.invalidEmail"))
      .required(t("form.common.errors.required")),
    password: Yup.string()
      .min(
        SIGN_UP_FORM_CONFIG.passwordMinChars,
        t("form.signUpForm.errors.tooShortPassword")
      )
      .max(
        SIGN_UP_FORM_CONFIG.passwordMaxChars,
        t("form.signUpForm.errors.tooLongPassword")
      )
      .required(t("form.common.errors.required")),
    confirmPassword: Yup.string()
      .min(
        SIGN_UP_FORM_CONFIG.passwordMinChars,
        t("form.signUpForm.errors.tooShortPassword")
      )
      .max(
        SIGN_UP_FORM_CONFIG.passwordMaxChars,
        t("form.signUpForm.errors.tooLongPassword")
      )
      .equalTo(
        Yup.ref("password"),
        t("form.signUpForm.errors.notSamePasswords")
      )
      .required(t("form.common.errors.required")),
  });

  const onSubmit = (values) => {
    signUp(values);
  };

  return (
    <div>
      <Col offset={2} xs={20}>
        <Typography.Title level={4} style={{ padding: 0, marginBottom: 36 }}>
          {t("form.signUpForm.header")}
        </Typography.Title>
      </Col>
      <Formik
        onSubmit={onSubmit}
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={SignUpSchema}
      >
        {({ handleSubmit, errors, touched, submitCount }) => {
          const showEmailError = () => {
            if (!isNil(error)) {
              return error.data.message;
            } else if (errors.email && touched.email) {
              return errors.email;
            } else {
              return "";
            }
          };

          return (
            <form onSubmit={handleSubmit}>
              <FormItem
                label={t("common.firstName")}
                name="firstName"
                validateStatus={
                  errors.firstName && touched.firstName ? "error" : ""
                }
                help={
                  errors.firstName && touched.firstName ? errors.firstName : ""
                }
              >
                <Field id="firstName" name="firstName" type="text" as={Input} />
              </FormItem>
              <FormItem
                label={t("common.lastName")}
                name="lastName"
                validateStatus={
                  errors.lastName && touched.lastName ? "error" : ""
                }
                help={
                  errors.lastName && touched.lastName ? errors.lastName : ""
                }
              >
                <Field id="lastName" name="lastName" type="text" as={Input} />
              </FormItem>
              <FormItem
                label={t("common.email")}
                validateStatus={
                  !isNil(error) || (errors.email && touched.email)
                    ? "error"
                    : ""
                }
                help={showEmailError()}
              >
                <Field id="email" name="email" type="text" as={Input} />
              </FormItem>
              <FormItem
                label={t("common.password")}
                validateStatus={
                  errors.password && touched.password ? "error" : ""
                }
                help={
                  errors.password && touched.password ? errors.password : ""
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
                label={t("common.confirmPassword")}
                validateStatus={
                  errors.confirmPassword && touched.confirmPassword
                    ? "error"
                    : ""
                }
                help={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              >
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  as={Input}
                />
              </FormItem>
              <FormItem
                style={{ marginTop: 24 }}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>{t("form.signUpForm.updatesCheckbox")}</Checkbox>
              </FormItem>
              <FormItem style={{ marginTop: 64 }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={fetching}
                  style={{ width: "100%", height: 44 }}
                >
                  {fetching ? t("common.signingUp") : t("common.signUp")}
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
          {t("form.common.signIn")}{" "}
          <Link to={`/auth/signin${location.search}`}>
            {t("common.signIn")}
          </Link>
        </p>
      </Col>
    </div>
  );
}

export default SignUpTab;
