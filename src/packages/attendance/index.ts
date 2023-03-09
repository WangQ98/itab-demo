import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "考勤统计",
  desc: "",
  label: "考勤统计",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
