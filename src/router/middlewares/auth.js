import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import { notify } from "@kyvg/vue3-notification";

/**
 * This middleware will check if the user is authenticated and authorized to view the route
 *
 * To handle that, you'll need to specify in routes definition "meta.authenticate" that can be true or false
 * If meta.authenticate is not defined will be threated as false, so the user does not have to be authenticated
 * @param {import('vue-router').RouteLocationNormalized} from
 * @param {import('vue-router').RouteLocationNormalized} to
 * @param {import('vue-router').NavigationGuardNext} next
 */
export default function (to, from, next) {
  const { isUserAuthenticated, user_role, homePagePath } = storeToRefs(
    useAuthStore()
  );
  const { logout } = useAuthStore();

  if (to.name === "LoginPage" && isUserAuthenticated.value) {
    return next({ path: "/" });
  }

  //check authentication
  const requiresAuthentication = to.matched.some(
    (record) => record.meta.authenticate
  );

  if (
    requiresAuthentication &&
    !isUserAuthenticated.value &&
    to.name !== "LoginPage"
  ) {
    logout();
    return next({ name: "LoginPage" });
  }

  //check authorization
  /** @type {string[]}*/
  const { rolesAllowed } = to.meta;

  if (Array.isArray(rolesAllowed) && !rolesAllowed.includes(user_role.value)) {
    // TODO: redirect to 403 page
    notify({
      type: "error",
      text: "Accesso Negato",
    });
    return next({ path: homePagePath.value });
  }

  return next();
}
