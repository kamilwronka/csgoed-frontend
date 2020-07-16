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
  const { data: userData, fetching } = useUserData();
  const [state, dispatch] = useReducer(reducer, INITIAL_DATA);

  const activated = get(userData, "activated", false);

  useEffect(() => {
    if (state.data) {
      notification.destroy();
      openNotificationWithIcon("success", "Activation e-mail", "jeje", 5000);
    }

    if (state.error) {
      notification.destroy();
      openNotificationWithIcon("error", "Activation e-mail", state.error, 5000);
    }

    if (fetching) {
      openNotificationWithIcon("info", "Sending activation e-mail...", "", 0);
    }
  }, [state.error, state.data, fetching]);

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
