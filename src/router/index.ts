import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

const basicRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Layout,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
