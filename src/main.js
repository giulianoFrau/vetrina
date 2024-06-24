// * import vue
import "@/assets/scss/index.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "@/stores";

// * import PrimeVue
//    * services
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
// * directives
import Tooltip from "primevue/tooltip";
//    * import components
import PrimeVue from "primevue/config";
import primeVueConfig from "@/plugins/primevueConfig.js";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Image from "primevue/image";
import Divider from "primevue/divider";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
// * icons
import "primeicons/primeicons.css";

// * custom plugins
import { getImageURL } from "@/plugins/getImageURL.js";
import { capitalize } from "@/plugins/capitalize.js";
import { cutString } from "@/plugins/cutString.js";

// * font-awesome icons
import { FontAwesomeIcon } from "@/plugins/fortAwesomeIcons.js";

// * app
export const app = createApp(App);
app
  .use(PrimeVue, primeVueConfig)
  .directive("tooltip", Tooltip)
  .use(pinia)
  .use(router)
  .use(getImageURL)
  .use(capitalize)
  .use(cutString)
  .use(ConfirmationService)
  .use(ToastService)
  .use(DialogService)
  .component("Button", Button)
  .component("Dialog", Dialog)
  .component("Toast", Toast)
  .component("Image", Image)
  .component("Divider", Divider)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
