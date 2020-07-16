export default {
  API_URL: "http://192.168.8.130:4000",
  AUTH_SERVICE_URL:
    process.env.REACT_APP_AUTH_SERVICE_URL || "http://localhost:4000",
  USER_SERVICE_URL:
    process.env.REACT_APP_USER_SERVICE_URL || "http://localhost:4000",
  // API_URL: "https://api.csgoed.com",
  DEFAULT_AUTH_HEADER: "Authorization",
};
