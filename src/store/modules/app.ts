import { defineStore } from "pinia";
import { store } from "@/store";
import { navList } from "../mock";
import type { INavConfig } from "#/config";

interface AppState {
  navConfig: INavConfig[];
  activeNav: INavConfig;
}

// function getNavData(): INavConfig[] {
//   const localData = sessionStorage.getItem("navConfig");
//   if (localData && localData.length > 0) {
//     return JSON.parse(localData);
//   }
//   return navList;
// }

// const navConfig = getNavData();

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    navConfig: navList,
    activeNav: navList[0],
  }),
  getters: {
    getNavConfig: (state) => state.navConfig,
    getActiveNav: (state) => state.activeNav,
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
