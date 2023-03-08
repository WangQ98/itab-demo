import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "备忘录",
  desc: "备忘录是一款便利的和易用的备忘录工具软件。能帮您把任务贴在标签页桌面上,一目了然，",
  label: "备忘录",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
