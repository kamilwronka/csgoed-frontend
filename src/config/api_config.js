export default {
  API_URL: "http://192.168.8.130:4000",
  AUTH_SERVICE_URL:
    process.env.REACT_APP_AUTH_SERVICE_URL || "http://localhost/auth-service",
  USER_SERVICE_URL:
    process.env.REACT_APP_USER_SERVICE_URL || "http://localhost/auth-service",
  DEFAULT_AUTH_HEADER: "Authorization",
};
