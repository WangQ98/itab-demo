import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "element-plus的input组件",
  desc: "常用的输入框",
  widgets: import.meta.glob("./**/*.vue"),
} as IWidget;
