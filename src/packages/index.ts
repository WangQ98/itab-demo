import itabMaterials from "@/utils/itabMaterials";
import type { App } from "vue";
import type { IWidget } from "#/config";

const modules = import.meta.glob("./**/index.ts", { eager: true });

const wigetModules: IWidget[] = [];
Object.keys(modules).forEach((path) => {
  const widgetCategory: IWidget = modules[path].default || null;
  //注册组件
  if (!widgetCategory) {
    console.error(`路径${path}的模块，默认导出default不存在`);
  }
  wigetModules.push(widgetCategory);
});

export default {
  install: async (app: App) => {
    await itabMaterials.cherryPickCategory(wigetModules);
    const Materials = itabMaterials.getMaterials();
    for (const [name, widget] of Materials) {
      app.component(name, widget);
    }
  },
};
