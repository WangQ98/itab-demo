import { IconCategory } from "@/enums";
import type { IWidget } from "#/config";

export default {
  category: IconCategory.develop,
  title: "日历",
  desc: "日历是一款日历日期展示工具,小伙伴们可以通过农历日历软件了解当天的月、日、节日等信息。还有一些实用的日期小工具，自然日计算，",
  label: "日历",
  widgets: import.meta.glob("./src/*.vue", { eager: true }),
} as IWidget;
