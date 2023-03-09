import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "我的待办",
  desc: "",
  label: "我的待办",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
