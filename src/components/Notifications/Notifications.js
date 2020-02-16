import { useSocket } from "use-socketio";
import { notification } from "antd";
import { openNotificationWithIcon } from "helpers/openNotification";

function Notifications({ children }) {
  useSocket("basicServerLogs", ({ id, message, type }) => {
    notification.destroy();
    openNotificationWithIcon(type, message, "", 0);
  });

  return null;
}

export default Notifications;
