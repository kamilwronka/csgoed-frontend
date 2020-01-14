import React from "react";
import { Form, Input, Button } from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { signInUser } from "features/AuthPage/actions/auth.actions";
import { useAuthData } from "hooks";

const INITIAL_FORM_VALUES = {
  email: "kaam@kamil.pl",
  password: "password"
};

function SignInTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fetching } = useAuthData();

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("form.errors.InvalidEmail"))
      .required(t("form.errors.Required")),
    password: Yup.string()
      .min(8, t("form.errors.TooShortPassword"))
      .max(36, t("form.errors.TooLongPassword"))
      .required(t("form.errors.Required"))
  });

  const onSubmit = values => {
    dispatch(signInUser(values));
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={SigninSchema}
    >
      {({ handleSubmit, errors, touched }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Item
              label={t("common.Email")}
              validateStatus={errors.email && touched.email ? "error" : ""}
              help={errors.email && touched.email ? errors.email : ""}
            >
              <Field id="email" name="email" type="text" as={Input} />
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
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={fetching}>
                {fetching ? t("common.SigningIn") : t("common.SignIn")}
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignInTab;
