import axios from "axios";

const https = axios.create({
  baseURL: "https://texnoark.ilyosbekdev.uz/",
});

https.interceptors.request.use((config) => {
  const access_token = sessionStorage.getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

export default https;
