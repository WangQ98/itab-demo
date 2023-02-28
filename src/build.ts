//组件
import "@/styles/index.less";
import "@unocss/reset/tailwind.css";
import "gridstack/dist/gridstack.min.css";
import "uno.css";
import "./unocss-icon";
import ITab from "@/layout/index.vue";
//组件接口
export { default as itabMaterials } from "@/utils/itabMaterials";
//自带组件资源
export { default as itabPackages } from "@/packages";

export default ITab;
