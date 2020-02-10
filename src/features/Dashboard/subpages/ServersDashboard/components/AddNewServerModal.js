import React, { useEffect, useRef } from "react";
import { Formik, Field } from "formik";
import { Modal, Form, Input, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { isNil, noop } from "lodash";

import {
  fetchAvailableGames,
  createNewServer,
  resetCreateNewServer
} from "features/Dashboard/actions/servers.actions";
import { openNotificationWithIcon } from "helpers/openNotification";

const { Option } = Select;

const FORM_INITIAL_STATE = {
  serverName: "",
  game: ""
};

function AddNewServerModal({ visible, setVisibility }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { data: gamesData, fetching: gamesFetching } = useSelector(
    state => state.dashboardPage.availableGames
  );

  const {
    data: createNewServerData,
    fetching: createNewServerFetching
  } = useSelector(state => state.dashboardPage.createNewServer);

  useEffect(() => {
    visible && dispatch(fetchAvailableGames());
  }, [dispatch, visible]);

  useEffect(() => {
    if (createNewServerData && visible) {
      setVisibility(false);
      dispatch(resetCreateNewServer());
      openNotificationWithIcon(
        "success",
        "You successfully created a new server."
      );
    }
  }, [createNewServerData, setVisibility, visible, dispatch]);

  const NewServerSchema = Yup.object().shape({
    serverName: Yup.mixed()
      .test({
        test: value => /^[-A-Za-z0-9]+$/.test(value),
        message: t("dashboard.form.allowedCharacters")
      })
      .required(t("form.common.errors.required")),
    game: Yup.string().required(t("form.common.errors.required"))
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createNewServer(values));
    resetForm(FORM_INITIAL_STATE);
  };

  const onCancel = () => {
    if (formRef.current) {
      formRef.current.props.reset();
      setVisibility(false);
    }
  };

  return (
    <Modal
      title={t("dashboard.createNew")}
      visible={visible}
      onOk={setVisibility}
      onCancel={setVisibility}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("common.Cancel")}
        </Button>,
        <Button
          loading={createNewServerFetching}
          key="create"
          type="primary"
          onClick={formRef.current ? formRef.current.props.onSubmit : noop}
        >
          {t("common.Create")}
        </Button>
      ]}
    >
      <Formik
        initialValues={FORM_INITIAL_STATE}
        validationSchema={NewServerSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          setTouched,
          setFieldValue,
          handleSubmit,
          resetForm,
          values
        }) => {
          return (
            <Form onSubmit={handleSubmit} ref={formRef} reset={resetForm}>
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
                  loading={gamesFetching}
                  id="game"
                  name="game"
                  value={values.game}
                  onChange={value => setFieldValue("game", value)}
                  onBlur={() =>
                    !touched.game && setTouched({ ...touched, game: true })
                  }
                >
                  {!isNil(gamesData) &&
                    gamesData.map(({ game, fullName, id }) => {
                      return (
                        <Option key={id} value={game}>
                          {fullName}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default AddNewServerModal;
