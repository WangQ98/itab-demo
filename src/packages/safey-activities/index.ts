import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "安全活动",
  desc: "",
  label: "安全活动",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
