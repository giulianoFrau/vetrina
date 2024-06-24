import axios from "axios";

import { app } from "@/main.js";

const axiosInstance = axios.create({
  timeout: 60 * 1000,
  baseURL: import.meta.env.VITE_DB_URL,
  params: {},
});

axiosInstance.interceptors.response.use((response) => {
  if (
    response.data.result == "ERR:Session Expired !" ||
    response.data.msg == "Token Expired"
  ) {
    app.config.globalProperties.$toast.add({
      severity: "error",
      summary: "Sessione scaduta",
      life: 2200,
      closable: false,
    });
  } else {
    return response;
  }
});

const axiosInstanceLogin = axios.create({
  timeout: 60 * 1000,
  baseURL: import.meta.env.VITE_DB_URL_LOGIN,
  params: {},
});

axiosInstanceLogin.interceptors.response.use((response) => {
  if (
    response.data.result == "ERR:Session Expired !" ||
    response.data.msg == "Token Expired"
  ) {
    app.config.globalProperties.$toast.add({
      severity: "error",
      summary: "Sessione scaduta",
      life: 2200,
      closable: false,
    });
  } else {
    return response;
  }
});

const axiosInstanceAdminCredential = axios.create({
  timeout: 60 * 1000,
  baseURL: import.meta.env.VITE_DB_URL_ADMIN_ACTIONS,
  params: {},
});

axiosInstanceAdminCredential.interceptors.response.use((response) => {
  if (
    response.data.result == "ERR:Session Expired !" ||
    response.data.msg == "Token Expired"
  ) {
    app.config.globalProperties.$toast.add({
      severity: "error",
      summary: "Sessione scaduta",
      life: 2200,
      closable: false,
    });
  } else {
    return response;
  }
});

export {
  axiosInstance as axios,
  axiosInstanceLogin,
  axiosInstanceAdminCredential,
};
