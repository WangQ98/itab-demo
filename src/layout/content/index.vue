<template>
  <div class="app-icon-grid-wrap">
    <div class="text-center">1111</div>
    <GridContainer ref="containerRef" @add="handleGridItem" />
    <AddWidget
      v-model:dialog-visible="addDialogVisible"
      @add="handleAddWidget"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppStoreWithOut } from "@/store/modules/app";
import AddWidget from "@/components/AddWidget/index.vue";
import GridContainer from "./components/GridContainer.vue";
import type { GridStack } from "gridstack";
import type { IWidgetItem } from "#/config";

const appStore = useAppStoreWithOut();

const addDialogVisible = ref<boolean>(false);
const containerRef = ref<{ grids: GridStack[] } | null>(null);

const activeNav = computed(() => appStore.getActiveNav);

function handleGridItem(widget: IWidgetItem) {
  const { type, url } = widget;
  if (url === "itab://add") {
    addDialogVisible.value = true;
    return;
  }
  if (type === "icon") {
    window.open(url);
  }
}

function handleAddWidget(widget: IWidgetItem) {
  const node: IWidgetItem = {
    ...widget,
    x: 0,
    y: 0,
    w: +widget.size.split("x")[1],
    h: +widget.size.split("x")[0],
  };
  activeNav.value?.children.push(node);
  const { id: activeNavId } = activeNav.value;
  const grid = containerRef.value?.grids.find(
    (it) => it.el?.dataset.id === activeNavId
  );
  nextTick(() => {
    grid?.makeWidget(node.id);
  });
}
</script>

<style lang="less" scoped>
.app-icon-grid-wrap {
  flex: 1;
  transition: 0.1s ease;
}
</style>
