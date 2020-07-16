import { API_CONFIG } from "config";
import { ApiService } from "./api.service";

export const AuthService = (options) =>
  new ApiService(API_CONFIG.AUTH_SERVICE_URL, options).createInstance();
