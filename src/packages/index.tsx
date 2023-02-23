import itabMaterials from "@/utils/itabMaterials";
import type { IWidget } from "#/config";

const modules = import.meta.glob("./**/index.ts", { eager: true });
console.log(modules);

const wigetModules: IWidget[] = [];
Object.keys(modules).forEach((path) => {
  const widgetCategory: IWidget = modules[path].default || null;
  console.log(widgetCategory);
  //注册组件
  if (!widgetCategory) {
    console.error(`路径${path}的模块，默认导出default不存在`);
  }
  wigetModules.push(widgetCategory);
});

itabMaterials.cherryPickCategory(wigetModules);
