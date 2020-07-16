import React, { useEffect, useRef, useState } from "react";
import { Formik, Field } from "formik";
import { Modal, Form, Input, Select, Button, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { isNil, noop, get } from "lodash";

import { openNotificationWithIcon } from "helpers/openNotification";
import Logs from "components/Logs";
import { useSocket } from "use-socketio";
import useLayout from "hooks/useLayout";
import CreateCSGOForm from "./ServerForms/CSGO";

const { Option } = Select;

const FORM_INITIAL_STATE = {
  serverName: "",
  game: "",
};

function AddNewServerModal({ visible, setVisibility }) {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [submitButton, setSubmitButton] = useState({
    text: t("common.create"),
  });
  const { mobile } = useLayout();

  const { socket } = useSocket("createServer", ({ message }) => {
    openNotificationWithIcon("success", message);
    setSubmitButton((state) => ({
      ...state,
      text: t("common.continue"),
      fetching: false,
    }));
    setVisibility(false);
  });

  // const { data: gamesData, fetching: gamesFetching } = useSelector(
  //   (state) => state.serversDashboard.availableGames
  // );

  // const {
  //   data: createNewServerData,
  //   fetching: createNewServerFetching,
  // } = useSelector((state) => state.serversDashboard.createNewServer);

  // useEffect(() => {}, [dispatch, visible]);

  // useEffect(() => {
  //   if (createNewServerData && visible) {
  //     setVisibility(false);
  //     openNotificationWithIcon(
  //       "success",
  //       "You successfully created a new server."
  //     );
  //   }
  // }, [createNewServerData, setVisibility, visible, dispatch]);

  const NewServerSchema = Yup.object().shape({
    serverName: Yup.mixed()
      .test({
        test: (value) => /^[-A-Za-z0-9]+$/.test(value),
        message: t("dashboard.form.allowedCharacters"),
      })
      .required(t("form.common.errors.required")),
    game: Yup.string().required(t("form.common.errors.required")),
  });

  const onSubmit = (values) => {
    console.log(values);
    socket.emit("createServer", { ...values, name: values.serverName });
    // setSubmitButton(state => ({
    //   ...state,
    //   text: t("common.creating"),
    //   fetching: true
    // }));
  };

  const renderProperForm = (game, props) => {
    const { values, touched, errors, setFieldValue, setTouched } = props;

    switch (game) {
      case "csgo":
        return (
          <CreateCSGOForm
            values={values}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
            setTouched={setTouched}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      title={t("dashboard.createNew")}
      visible={visible}
      onClose={setVisibility}
      width={mobile ? "100%" : 600}
    >
      <Formik
        initialValues={FORM_INITIAL_STATE}
        validationSchema={NewServerSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const {
            errors,
            touched,
            setTouched,
            setFieldValue,
            handleSubmit,
            resetForm,
            values,
          } = props;

          return (
            <Form
              onFinish={handleSubmit}
              ref={formRef}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label={t("dashboard.serverName")}
                validateStatus={
                  errors.serverName && touched.serverName ? "error" : ""
                }
                help={
                  errors.serverName && touched.serverName
                    ? errors.serverName
                    : ""
                }
              >
                <Field
                  id="serverName"
                  name="serverName"
                  type="text"
                  as={Input}
                />
              </Form.Item>
              <Form.Item
                label={t("dashboard.game")}
                validateStatus={errors.game && touched.game ? "error" : ""}
                help={errors.game && touched.game ? errors.game : ""}
              >
                <Select
                  // loading={gamesFetching}
                  id="game"
                  name="game"
                  value={values.game}
                  onChange={(value) => setFieldValue("game", value)}
                  onBlur={() =>
                    !touched.game && setTouched({ ...touched, game: true })
                  }
                >
                  {/* {!isNil(gamesData) &&
                    gamesData.map(({ game, fullName, id }) => {
                      return (
                        <Option key={id} value={game}>
                          {fullName}
                        </Option>
                      );
                    })} */}
                </Select>
              </Form.Item>
              {renderProperForm(values.game, props)}
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button
                  loading={submitButton.fetching}
                  key="create"
                  type="primary"
                  onClick={formRef.current ? formRef.current.submit : noop}
                >
                  {submitButton.text}
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    </Drawer>
  );
}

export default AddNewServerModal;
