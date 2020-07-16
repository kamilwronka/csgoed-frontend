import { API_CONFIG } from "config";
import { ApiService } from "./api.service";

export const UserService = (options) =>
  new ApiService(API_CONFIG.USER_SERVICE_URL, options).createInstance();
