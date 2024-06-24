import { axiosInstanceAdminCredential as axios } from "./axios.js";

export default {
  resetPassword(data) {
    const objectInJson = JSON.stringify(data);
    return axios.post("/api/resetpwd", objectInJson);
  },

  changePassword(data) {
    const objectInJson = JSON.stringify(data);
    return axios.post("/api/changepwd", objectInJson);
  },
};
