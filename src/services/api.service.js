import axios from "axios";
import { isNil, get } from "lodash";
import { message } from "antd";

import { API_CONFIG } from "config";
import { openNotificationWithIcon } from "helpers/openNotification";

class ApiService {
  constructor(type, options) {
    this.options = options;
    this.type = type;

    this.instance = axios.create({
      baseURL: API_CONFIG.API_URL
    });
  }

  setToken(token) {
    if (!isNil(token)) {
      this.instance.defaults.headers.common[
        API_CONFIG.DEFAULT_AUTH_HEADER
      ] = `Bearer ${token}`;
    }
  }

  get() {
    const { url, data, needsAuth } = this.options;

    return {
      type: this.type,
      payload: token => {
        if (needsAuth) this.setToken(token);

        return this.instance.get(url, data).catch(err => {
          openNotificationWithIcon(
            "error",
            "Unable to fetch data",
            get(err, "response.data.message")
              ? `Status ${err.response.status} - ${err.response.data.message}`
              : null
          );
        });
      }
    };
  }

  post() {
    const { url, data, needsAuth } = this.options;

    return {
      type: this.type,
      payload: token => {
        if (needsAuth) this.setToken(token);

        return this.instance.post(url, { ...data });
      }
    };
  }
}

export default (type, options) =>
  new ApiService(type, options)[options.method]();
