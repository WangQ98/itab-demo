import { GridStack } from "gridstack";
import { ElMessage } from "element-plus";
import { useAppStoreWithOut } from "@/store/modules/app";

export default function useGridStack() {
  const appStore = useAppStoreWithOut();
  const activeNav = computed(() => appStore.getActiveNav);

  const grids = shallowRef<GridStack[]>([]);

  onMounted(() => {
    nextTick(() => {
      grids.value = GridStack.initAll({
        cellHeight: "120px",
        minRow: 1,
      });

      grids.value.forEach((grid) => {
        grid.enableResize(false);

        grid.on("dragstop", (event: any, element: any) => {
          const node = element.gridstackNode;
          ElMessage({
            type: "success",
            message: `成功移动至${node.y / 2 + 1}行${node.x + 1}列`,
          });
        });

        grid.on("change", handleWidgetChange);
      });
    });
  });

  onScopeDispose(() => {
    if (grids.value) {
      grids.value.forEach((grid) => {
        grid.destroy();
      });
    }
  });

  function handleWidgetChange(event: any, changeItems: any[]) {
    for (const item of changeItems) {
      const { id, x, y } = item;
      const widget = activeNav.value?.children.find((it) => it.id === id);
      if (widget) {
        widget.x = x;
        widget.y = y;
      }
    }
  }

  return {
    grids,
  };
}
