import "@/styles/index.less";
import "@unocss/reset/tailwind.css";
import "gridstack/dist/gridstack.min.css";
import "uno.css";
import "element-plus/theme-chalk/index.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";

import { setupRouter } from "./router";
import { setupStore } from "./store";
import "./unocss-icon";

(() => {
  const app = createApp(App);

  setupRouter(app);

  setupStore(app);

  app.use(ElementPlus);

  app.mount("#app");
})();
