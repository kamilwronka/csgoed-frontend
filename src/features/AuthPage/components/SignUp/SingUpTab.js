import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { isNil } from "lodash";

import { SIGN_UP_FORM_CONFIG } from "config";
import { signUpUser } from "features/AuthPage/actions/auth.actions";
import { equalTo } from "helpers/equalTo";
import { useAuthData } from "hooks";

const INITIAL_FORM_VALUES = {
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  name: ""
};

Yup.addMethod(Yup.string, "equalTo", equalTo);

function SignUpTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fetching, error } = useAuthData();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
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
    confirmEmail: Yup.string()
      .email(t("form.signUpForm.errors.invalidEmail"))
      .equalTo(Yup.ref("email"), t("form.signUpForm.errors.notSameEmails"))
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
      .required(t("form.common.errors.required"))
  });

  const onSubmit = values => {
    dispatch(signUpUser(values));
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={SignUpSchema}
    >
      {({ handleSubmit, errors, touched, submitCount }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {!isNil(error) && submitCount > 0 && (
                <Alert
                  message={t("form.signUpForm.errors.unableToSignUp")}
                  description={error.data.message}
                  type="error"
                  showIcon
                />
              )}
            </Form.Item>
            <Form.Item
              label={t("common.Name")}
              validateStatus={errors.name && touched.name ? "error" : ""}
              help={errors.name && touched.name ? errors.name : ""}
            >
              <Field id="name" name="name" type="text" as={Input} />
            </Form.Item>
            <Form.Item
              label={t("common.Email")}
              validateStatus={errors.email && touched.email ? "error" : ""}
              help={errors.email && touched.email ? errors.email : ""}
            >
              <Field id="email" name="email" type="text" as={Input} />
            </Form.Item>
            <Form.Item
              label={t("common.ConfirmEmail")}
              validateStatus={
                errors.confirmEmail && touched.confirmEmail ? "error" : ""
              }
              help={
                errors.confirmEmail && touched.confirmEmail
                  ? errors.confirmEmail
                  : ""
              }
            >
              <Field
                id="confirmEmail"
                name="confirmEmail"
                type="text"
                as={Input}
              />
            </Form.Item>
            <Form.Item
              label={t("common.Password")}
              validateStatus={
                errors.password && touched.password ? "error" : ""
              }
              help={errors.password && touched.password ? errors.password : ""}
            >
              <Field id="password" name="password" type="password" as={Input} />
            </Form.Item>
            <Form.Item
              label={t("common.ConfirmPassword")}
              validateStatus={
                errors.confirmPassword && touched.confirmPassword ? "error" : ""
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
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={fetching}>
                {fetching ? t("common.SigningUp") : t("common.SignUp")}
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignUpTab;
