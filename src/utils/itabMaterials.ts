import { generateUid } from "@/utils";
import type { IWidget, IWidgetCategory, IWidgetItem } from "#/config";

class MaterialsWarehouse {
  constructor() {
    this.MaterialsMap = new Map() as Recordable<IWidgetItem>;
    this.CategoryMap = new Map() as Recordable<IWidget>;
  }

  //读取
  getMaterials(
    category?: IWidgetCategory
  ): Recordable<IWidget> | Recordable<IWidgetItem> {
    if (category) {
      const categoryArray: Recordable<IWidget> = this.CategoryMap.get(category);
      return categoryArray;
    }
    return this.MaterialsMap;
  }
  queryMaterial(name: string): IWidgetItem | null {
    return this.MaterialsMap.get(name) || null;
  }
  //操作
  addMaterial(widget: IWidgetItem) {
    const { name = "" } = widget || {};
    const existWideget = this.MaterialsMap.has(name)
      ? this.MaterialsMap.get(name)
      : null;
    if (existWideget && existWideget !== widget) {
      console.error(
        `${name || widget?.toString()}组件已注册过，旧的${name}将被替换`
      );
      this.MaterialsMap.set(name, widget);
    } else if (!existWideget) {
      this.MaterialsMap.set(name, widget);
    }
  }
  batchMaterial(widgets: IWidgetItem[]) {
    if (!Array.isArray(widgets)) {
      throw new TypeError(
        "batchMaterial 方法的参数错误，请传入类型为数组的组件集"
      );
    }
    widgets?.forEach((widget: IWidgetItem) => {
      widget && this.addMaterial(widget);
    });
  }
  cherryPickCategory(categoryArray: IWidget[]) {
    if (!Array.isArray(categoryArray)) {
      throw new TypeError(
        "cherryPickCategory 方法的参数错误，请传入类型为数组的组件集"
      );
    }
    categoryArray?.forEach(async (categoryItem: IWidget) => {
      const { category, widgets = [] } = categoryItem;
      if (Array.isArray(widgets)) {
        this.batchMaterial(widgets);
      } else if (typeof widgets === "object") {
        const Material = [];
        const traverseKeys = Object.keys(widgets);
        for (const key of traverseKeys) {
          let widget = widgets[key];
          if (typeof widget === "function") {
            const module = await widget();
            widget = module.default;
          }
          if (!widget || typeof widget !== "object") {
            widget = null;
          }
          Material.push(widget);
        }
        this.batchMaterial(Material);
        categoryItem.widgets = Material;
      }
      if (!this.CategoryMap.has(category)) {
        const newScope = new Set();
        newScope.add(categoryItem);
        this.CategoryMap.set(category, newScope);
      } else {
        const existScope = this.CategoryMap.get(category);
        existScope.add(categoryItem);
      }
    });
  }
}

const itabMaterials = new MaterialsWarehouse();

export default itabMaterials;
