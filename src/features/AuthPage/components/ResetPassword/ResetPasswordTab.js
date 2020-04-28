import React, { useEffect } from "react";
import { Typography, Col, Button } from "antd";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";
import { Link } from "react-router-dom";

import FormItem from "components/FormItem";
import Input from "components/Input";
import { useAuthData } from "hooks";
import { useLocation } from "react-use";

const INITIAL_FORM_VALUES = {
  email: "",
};

function ResetPasswordTab() {
  const { t } = useTranslation();
  const { fetching, error } = useAuthData();
  const location = useLocation();

  const onSubmit = (values) => {
    console.log(values);
  };

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("form.signUpForm.errors.invalidEmail"))
      .required(t("form.common.errors.required")),
  });

  useEffect(() => {
    document.title = t("form.passwordResetForm.title");
  }, [t]);

  return (
    <div>
      <Col offset={2} xs={20}>
        <Typography.Title level={4} style={{ padding: 0, marginBottom: 36 }}>
          {t("form.passwordResetForm.header")}
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
              <FormItem style={{ marginTop: 64 }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={fetching}
                  style={{ width: "100%", height: 44 }}
                >
                  {t("common.continue")}
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

export default ResetPasswordTab;
