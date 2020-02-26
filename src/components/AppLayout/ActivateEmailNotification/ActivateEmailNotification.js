import React, { useEffect } from "react";
import { Alert, Button, notification } from "antd";
import { useTranslation } from "react-i18next";
import { get } from "lodash";

import { useUserData } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { sendActivationEmail } from "features/AuthPage/actions/auth.actions";
import { openNotificationWithIcon } from "helpers/openNotification";

function ActivateEmailNotification() {
  const { t } = useTranslation();
  const { data: userData } = useUserData();
  const dispatch = useDispatch();
  const { data: mailData, error: mailError, fetching } = useSelector(
    state => state.emailActivation
  );

  const errorMessage = get(mailError, "data.message");
  const successMessage = get(mailData, "message");
  const activated = get(userData, "activated", false);

  const resendActivationEmail = () => {
    dispatch(sendActivationEmail());
  };

  useEffect(() => {
    if (successMessage) {
      notification.destroy();
      openNotificationWithIcon(
        "success",
        "Activation e-mail",
        successMessage,
        5000
      );
    }

    if (errorMessage) {
      notification.destroy();
      openNotificationWithIcon(
        "error",
        "Activation e-mail",
        errorMessage,
        5000
      );
    }

    if (fetching) {
      openNotificationWithIcon("info", "Sending activation e-mail...", "", 0);
    }
  }, [successMessage, errorMessage, fetching]);

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
