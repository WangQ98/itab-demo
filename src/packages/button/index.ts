import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "element-plus的button组件",
  desc: "常用的操作按钮",
  widgets: import.meta.glob("./src/**/*.vue"),
} as IWidget;
