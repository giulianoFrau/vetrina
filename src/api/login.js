import { axiosInstanceLogin as axios } from "./axios.js";

export default {
  submit(data) {
    const objectInJson = JSON.stringify(data);
    return axios.post("/community/login.php", objectInJson);
  },
  validateToken(data) {
    const objectInJson = JSON.stringify(data);
    return axios.post("/shopinshop/validate_token.php", objectInJson);
  },
};
