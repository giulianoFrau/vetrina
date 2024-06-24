import { defineStore } from "pinia";
import { axios } from "@/api/axios.js";
import { Login } from "@/api/index.js";
import router from "@/router/index.js";
import { notify } from "@kyvg/vue3-notification";
import md5 from "blueimp-md5";

export const useAuthStore = defineStore({
  id: "auth",
  persist: true,
  state: () => ({
    user_id: null,
    org_id: null,
    token: null,

    user_role: null,
    userName: null,
    roleName: null,
    billable: null,
  }),

  actions: {
    async login(data) {
      try {
        const resp = await Login.submit({
          user_id: data.user_id,
          password: md5(`${data.user_id}.${data.password}`),
          org_id: 3500,
        });
        if (resp.data.result == "OK") {
          this.org_id = resp.data.org_id;
          this.token = resp.data.token;
          this.user_id = data.user_id;
          this.user_role = resp.data.roles;

          this.userName =
            resp.data.name || resp.data.last_name
              ? `${resp.data.name ? resp.data.name : ""}${
                  resp.data.name && resp.data.last_name ? " " : ""
                }${resp.data.last_name ? resp.data.last_name : ""}`
              : data.user_id;

          this.roleName = resp.data.roles[0].ROLE_NAME;
          this.billable = resp.data.roles[0].BILLABLE == "Y" ? true : false;

          // localStorage.setItem("token", this.token);
          // axios.defaults.params.v_i_token = this.token;
          // axios.defaults.params.v_i_user_id = this.user_id;

          router.push("/homePage");
        } else {
          console.warn(resp);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async validateToken() {
      if (this.token) {
        try {
          const resp = await Login.validateToken(this.token);
          if (resp.data.result != "OK") {
            notify({
              title: "Errore",
              text: resp.data.result_msg,
              type: "error",
            });
            this.logout();
          }
        } catch (err) {
          this.logout();
          console.warn(err);
          notify({
            title: "Errore",
            text: "Ci scusiamo, il server non ha risposto entro il tempo previsto. Riprova più tardi.",
            type: "error",
          });
        }
      }
    },

    logout() {
      axios.defaults.params.token = this.token = null;
      this.org_id = null;
      this.token = null;
      this.user_id = null;
      this.user_role = null;
      this.userName = null;
      this.roleName = null;
      this.billable = null;

      notify({
        title: "Effettuato log out",
        type: "info",
      });
      router.push("/account/login");
    },
  },

  getters: {
    isUserAuthenticated() {
      return !!this.token;
    },
  },
});
