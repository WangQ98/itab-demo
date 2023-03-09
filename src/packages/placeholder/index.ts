import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "占位符",
  desc: "",
  label: "",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
