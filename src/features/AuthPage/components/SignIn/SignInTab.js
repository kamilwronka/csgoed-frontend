import React, { useEffect } from "react";
import { Form, Input, Button, Alert, Layout, Checkbox } from "antd";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { isNil } from "lodash";

import { signInUser } from "features/AuthPage/actions/auth.actions";
import { useAuthData } from "hooks";

const INITIAL_FORM_VALUES = {
  email: "kaam@kamil.pl",
  password: "password"
};

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 18 }
};

function SignInTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fetching, error } = useAuthData();

  useEffect(() => {
    document.title = "Sign in - csgoed.com";
  }, []);

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("form.signUpForm.errors.invalidEmail"))
      .required(t("form.common.errors.required")),
    password: Yup.string()
      .min(8, t("form.signUpForm.errors.tooShortPassword"))
      .max(36, t("form.signUpForm.errors.tooLongPassword"))
      .required(t("form.common.errors.required"))
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
      {({ handleSubmit, errors, touched, submitCount }) => {
        return (
          <Form
            // className="ant-form ant-form-horizontal"
            // onSubmit={handleSubmit}
            {...formLayout}
            onFinish={handleSubmit}
            labelAlign="left"
          >
            <Form.Item wrapperCol={22}>
              {!isNil(error) && submitCount > 0 && (
                <Alert
                  message={t("form.signInForm.errors.unableToSignIn")}
                  description={t("form.signInForm.errors.unableToSignInDesc")}
                  type="error"
                  showIcon
                />
              )}
            </Form.Item>
            <Form.Item
              label={t("common.email")}
              validateStatus={errors.email && touched.email ? "error" : ""}
              help={errors.email && touched.email ? errors.email : ""}
            >
              <Field id="email" name="email" type="text" as={Input} />
            </Form.Item>
            <Form.Item
              label={t("common.password")}
              validateStatus={
                errors.password && touched.password ? "error" : ""
              }
              help={errors.password && touched.password ? errors.password : ""}
            >
              <Field
                id="password"
                name="password"
                type="password"
                as={Input.Password}
              />
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button htmlType="submit" type="primary" loading={fetching}>
                {fetching ? t("common.signingIn") : t("common.signIn")}
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignInTab;
