import axios from "axios";
import { isNil } from "lodash";

import { API_CONFIG } from "config";

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

        return this.instance.get(url, data);
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
