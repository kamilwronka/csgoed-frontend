import Axios from "axios";
import { LocalStorage } from "./localstorage.service";
import { isNil, get } from "lodash";
import { API_CONFIG } from "config";
import { emitter, EMITTER_EVENTS } from "./event.service";

export class ApiService {
  constructor(apiUrl, options = { needsAuth: false }) {
    this.apiUrl = apiUrl;
    this.isRefreshing = false;
    this.refreshAttempts = 0;
    this.instance = Axios.create({ baseURL: this.apiUrl });
    this.options = options;

    this.options.needsAuth &&
      this.instance.interceptors.request.use((config) => {
        const token = get(LocalStorage.get("auth"), "accessToken", null);

        if (!token) {
          return Promise.reject({ response: { status: 401 } });
        }

        return {
          ...config,
          headers: {
            Authorization: "Bearer " + LocalStorage.get("auth").accessToken,
          },
        };
      });

    this.options.needsAuth &&
      this.instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            !this.isRefreshing &&
            !this.refreshAttempts > 0 &&
            !isNil(error.response) &&
            error.response.status === 401
          ) {
            this.isRefreshing = true;
            try {
              this.refreshAttempts = 0;
              await this.refreshToken();
              this.isRefreshing = false;
              this.refreshAttempts = this.refreshAttempts + 1;

              return this.instance.request(error.config);
            } catch {
              emitter.emit(EMITTER_EVENTS.SYNC_AUTH_DATA, {
                authorized: false,
                refreshToken: null,
                accessToken: null,
              });

              this.isRefreshing = false;
              this.refreshAttempts = this.refreshAttempts + 1;
              return Promise.reject();
            }
          }

          return Promise.reject(error);
        }
      );
  }

  async refreshToken() {
    const response = await Axios.get(API_CONFIG.AUTH_SERVICE_URL + "/refresh", {
      headers: {
        Authorization: "Bearer " + LocalStorage.get("auth").refreshToken,
      },
    });

    emitter.emit(EMITTER_EVENTS.SYNC_AUTH_DATA, {
      authorized: true,
      refreshToken: response.data.refreshToken,
      accessToken: response.data.accessToken,
    });
  }

  createInstance() {
    return this.instance;
  }
}
