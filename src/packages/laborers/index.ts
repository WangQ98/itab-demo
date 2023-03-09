import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "劳务人员",
  desc: "",
  label: "劳务人员",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
