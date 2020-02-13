import { notification } from "antd";

export const openNotificationWithIcon = (
  type,
  title,
  message,
  duration = 4
) => {
  notification[type]({
    message: title,
    description: message,
    duration
  });
};
