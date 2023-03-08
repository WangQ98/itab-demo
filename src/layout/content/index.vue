<template>
  <div class="app-icon-grid-wrap">
    <Date />
    <Search />
    <GridContainer ref="containerRef" @add="handleGridItem" />

    <AddWidget
      v-model="addDialogVisible"
      v-model:dialog-visible="addDialogVisible"
      @add="handleAddWidget"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppStoreWithOut } from "@/store/modules/app";
import AddWidget from "@/components/AddWidget/index.vue";
import GridContainer from "./components/GridContainer.vue";
import Search from "./components/Search.vue";
import Date from "./components/Date.vue";

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
  };
  if (widget.type === "component") {
    const [h, w] = widget.size.split("x");
    node.h = Number(h);
    node.w = Number(w);
  }
  activeNav.value?.children.push(node);
  const { id: activeNavId } = activeNav.value;
  const grid = containerRef.value?.grids.find(
    (it) => it.el?.dataset.id === activeNavId
  );
  nextTick(() => {
    grid?.makeWidget(node.id);
    const nav = activeNav.value?.children.find((it) => it.id === node.id);
    const nd = grid?.engine?.nodes.find((it) => it.id === node.id);
    nav!.x = nd?.x;
    nav!.y = nd?.y;
  });
}
</script>

<style lang="less" scoped>
.app-icon-grid-wrap {
  flex: 1;
  transition: 0.1s ease;
}
</style>
