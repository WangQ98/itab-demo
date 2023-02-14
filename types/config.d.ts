type IWidgetType = "component" | "icon";

export interface INavConfig {
  id: string;
  name: string;
  icon: string;
  children: IWidgetItem[];
}

export interface IWidgetItem {
  id: string;
  name: string;
  size: string;
  type: IWidgetType;
  component: string;
  backgroundColor?: string;
  src?: string;
  url?: string;
  view?: string;
}
