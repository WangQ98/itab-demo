import type { IWidget, IWidgetCategory, IWidgetComponent } from "#/config";

export type MaterialsMapType = Map<string, IWidgetComponent>;

export type CategorySetType = Set<IWidget>;

export type CategoryMapType = Map<IWidgetCategory, CategorySetType>;

class MaterialsWarehouse {
  MaterialsMap: MaterialsMapType = new Map();
  CategoryMap: CategoryMapType = new Map();

  //读取
  getMaterials(
    category?: IWidgetCategory
  ): CategorySetType | CategoryMapType | MaterialsMapType {
    if (category) {
      return this.CategoryMap.get(category) || this.CategoryMap;
    }
    return this.MaterialsMap;
  }
  queryMaterial(name: string): IWidgetComponent | null {
    return this.MaterialsMap.get(name) || null;
  }
  //操作
  addMaterial(widget: IWidgetComponent) {
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
  batchMaterial(widgets: IWidgetComponent[]) {
    if (!Array.isArray(widgets)) {
      throw new TypeError(
        "batchMaterial 方法的参数错误，请传入类型为数组的组件集"
      );
    }
    widgets?.forEach((widget: IWidgetComponent) => {
      widget && this.addMaterial(widget);
    });
  }
  cherryPickCategory(categoryArray: IWidget[]) {
    if (!Array.isArray(categoryArray)) {
      throw new TypeError(
        "cherryPickCategory 方法的参数错误，请传入类型为数组的组件集"
      );
    }
    for (const categoryItem of categoryArray || []) {
      const { category, widgets = [] } = categoryItem;
      if (Array.isArray(widgets)) {
        this.batchMaterial(widgets);
      } else if (typeof widgets === "object") {
        const Material: IWidgetComponent[] = [];
        const traverseKeys = Object.keys(widgets);
        for (const key of traverseKeys) {
          let widget: IWidgetComponent | null = widgets[key];
          if (Object.prototype.toString.call(widget) === "[object Module]") {
            //@ts-ignore
            widget = widget?.default || null;
          }
          if (!widget || typeof widget !== "object") {
            widget = null;
          }
          widget && Material.push(widget);
        }
        this.batchMaterial(Material);
        categoryItem.widgets = Material;
      }
      if (!this.CategoryMap.has(category)) {
        const newScope: Set<IWidget> = new Set();
        newScope.add(categoryItem);
        this.CategoryMap.set(category, newScope);
      } else {
        const existScope = this.CategoryMap.get(category) as CategorySetType;
        existScope.add(categoryItem);
      }
    }
  }
}

const itabMaterials = new MaterialsWarehouse();

export default itabMaterials;
