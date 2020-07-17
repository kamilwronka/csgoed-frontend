import React, { useEffect, useReducer } from "react";
import { Alert, Button, notification } from "antd";
import { useTranslation } from "react-i18next";
import { get } from "lodash";

import useUserData from "hooks/useUserData";
import { openNotificationWithIcon } from "helpers/openNotification";
import { AuthService } from "services";

const INITIAL_DATA = {
  data: null,
  error: null,
  intact: true,
  fetching: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, fetching: true, intact: false };
    case "fulfilled":
      return { ...state, data: action.payload, fetching: false };
    case "error":
      return { ...state, error: action.payload, fetching: false };
    default:
      return state;
  }
};

function ActivateEmailNotification() {
  const { t } = useTranslation();
  const { data: userData } = useUserData();
  const [state, dispatch] = useReducer(reducer, INITIAL_DATA);

  const activated = get(userData, "activated", false);

  useEffect(() => {
    if (state.data) {
      notification.destroy();
      openNotificationWithIcon(
        "success",
        t("common.activation.activationEmailHeader"),
        t(`${state.data.message}`),
        5
      );
    }

    if (state.error) {
      notification.destroy();
      openNotificationWithIcon(
        "error",
        t("common.activation.activationEmailHeader"),
        t(`${state.error.message}`),
        5
      );
    }

    if (state.fetching) {
      openNotificationWithIcon("info", t("common.activation.sending"), "", 0);
    }
  }, [state.error, state.data, state.fetching, t]);

  const resendActivationEmail = async () => {
    dispatch({ type: "pending" });

    try {
      const response = await AuthService({ needsAuth: true }).post(
        "/resend-activation-email"
      );
      dispatch({ type: "fulfilled", payload: response.data });
    } catch (error) {
      dispatch({ type: "error", payload: error.response.data });
    }
  };

  return (
    !activated && (
      <Alert
        message={<strong>{t("common.activateEmailMessage")}</strong>}
        banner
        description={
          <div>
            <p>{t("common.activateEmailDescription")}</p>
            <Button
              style={{ padding: 0 }}
              type="link"
              onClick={resendActivationEmail}
            >
              {t("common.resendActivationEmailButton")}
            </Button>
          </div>
        }
        closable
        type="info"
        showIcon
      />
    )
  );
}

export default ActivateEmailNotification;
