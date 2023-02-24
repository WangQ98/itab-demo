import type { Component } from "vue";
import type { IconCategory, IconSize, IconType } from "@/enums";

type IWidgetSize = keyof typeof IconSize;

type IWidgetType = keyof typeof IconType;

type IWidgetCategory = keyof typeof IconCategory;

export type IWidgetComponent = {
  size: IWidgetSize;
  type: IconType;
} & Component;

export interface INavConfig {
  id: string;
  name: string;
  icon: string;
  children: IWidgetItem[];
}

export interface IWidget {
  category: IWidgetCategory;
  title: string;
  desc: string;
  label: string;
  widgets: IWidgetComponent[];
}

export interface IWidgetItem {
  id: string;
  name: string;
  size: IWidgetSize;
  type: IWidgetType;
  component: string | null;
  backgroundColor?: string;
  src?: string;
  url?: string;
  view?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}
