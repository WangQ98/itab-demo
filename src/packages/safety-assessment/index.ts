import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "安全生产考核",
  desc: "安全生产考核，安全生产考核安全生产考核，安全生产考核",
  label: "安全生产考核",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
