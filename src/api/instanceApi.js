const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.teleport.org/api/",
  timeout: 3000,
  headers: { Accept: "application/vnd.teleport.v1+json" },
});

export default axiosInstance;
