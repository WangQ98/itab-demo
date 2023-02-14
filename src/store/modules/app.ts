import { defineStore } from "pinia";
import { store } from "@/store";
import { navList } from "../mock";
import type { INavConfig } from "#/config";

interface AppState {
  navConfig: INavConfig[];
  activeNav: INavConfig;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    navConfig: navList,
    activeNav: navList[0],
  }),
  getters: {
    getNavConfig() {
      return this.navConfig;
    },
    getActiveNav() {
      return this.activeNav;
    },
  },
  actions: {
    setActiveNav(nav: INavConfig) {
      this.activeNav = nav;
    },
    addNav(nav: INavConfig) {
      this.navConfig.push(nav);
    },
    delNav(nav: INavConfig) {
      this.navConfig = this.navConfig.filter((item) => item.id !== nav.id);
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
