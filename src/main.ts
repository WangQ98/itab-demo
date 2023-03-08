import "@/styles/index.less";
import "@unocss/reset/tailwind.css";
import "gridstack/dist/gridstack.min.css";
import "uno.css";
import "element-plus/theme-chalk/index.css";

import { createApp } from "vue";
import Packages from "@/packages";
import App from "./App.vue";

import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupGlobDirectives } from "./directives";
import "./unocss-icon";

(() => {
  const app = createApp(App);

  app.use(Packages);

  setupRouter(app);

  setupStore(app);

  setupGlobDirectives(app);

  app.mount("#app");
})();
