import { IconCategory, IconSize } from "@/enums";
import type { IWidget, IWidgetComponent, IWidgetSize } from "#/config";

const modules = import.meta.glob("./**/*.vue", { eager: true });
const widgets: Record<string, IWidgetComponent> = {};
const enumsKeys: string[] = Object.keys(IconSize);

Object.keys(modules).forEach((path) => {
  if (
    enumsKeys?.find((key: string) =>
      path.includes(IconSize[key as IWidgetSize])
    ) !== undefined
  ) {
    widgets[path] = modules[path] as IWidgetComponent;
  }
});

export default {
  category: IconCategory.develop,
  title: "时钟",
  desc: "可以用来显示时间",
  label: "时钟",
  widgets,
} as IWidget;
