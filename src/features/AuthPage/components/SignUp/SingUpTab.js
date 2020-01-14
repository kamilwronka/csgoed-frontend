import React from "react";
import { Form, Input, Button } from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

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
  const { fetching } = useAuthData();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("form.errors.tooShortName"))
      .max(50, t("form.errors.tooLongName"))
      .required(t("form.errors.Required")),
    email: Yup.string()
      .email(t("form.errors.InvalidEmail"))
      .required(t("form.errors.Required")),
    confirmEmail: Yup.string()
      .email(t("form.errors.InvalidEmail"))
      .equalTo(Yup.ref("email"), t("form.errors.NotSameEmails"))
      .required(t("form.errors.Required")),
    password: Yup.string()
      .min(8, t("form.errors.TooShortPassword"))
      .max(36, t("form.errors.TooLongPassword"))
      .required(t("form.errors.Required")),
    confirmPassword: Yup.string()
      .min(8, t("form.errors.TooShortPassword"))
      .max(36, t("form.errors.TooLongPassword"))
      .equalTo(Yup.ref("password"), t("form.errors.NotSamePassword"))
      .required(t("form.errors.Required"))
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
      {({ handleSubmit, errors, touched }) => {
        return (
          <Form onSubmit={handleSubmit}>
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
                {t("common.SignUp")}
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignUpTab;
