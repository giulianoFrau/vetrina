import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores";

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes: [
    {
      path: "/account/login",
      name: "LoginPage",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/homePage",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/contatti",
      name: "Contatti",
      component: () => import("@/views/ContattiView.vue"),
    },
    {
      path: "/servizi",
      name: "Servizi",
      component: () => import("@/views/ServiziView.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      redirect: () => "/homePage",
    },
  ],
});

// router.beforeEach((from, to) => );
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const userLoggable = import.meta.env.VITE_IS_USER_LOGGABLE === "true";
  const publicPages = ["/account/login"];
  const authorizedRoutes = ["/account/login"];

  const authRequired = !publicPages.includes(to.path);
  const isRouteAuthorized = authorizedRoutes.includes(to.path);

  if (userLoggable) {
    if (authRequired) {
      //la route richede l'autenticazione
      if (!authStore.token) {
        authStore.logout(); //se non è autenticato lo faccio uscire
        return { path: "/account/login" };
      } else {
        if (isRouteAuthorized) {
          return { path: "/" };
        }
      }
    }
  }
});

export default router;
