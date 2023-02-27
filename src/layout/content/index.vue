<template>
  <div class="app-icon-grid-wrap">
    <div class="app-icon-grid">
      <ul class="app-icon-wrap h-full">
        <template v-for="nav in navConfig" :key="nav.id">
          <transition name="fade">
            <li v-show="activeNav.id == nav.id" class="h-full">
              <main class="h-full">
                <section class="grid-stack h-full" :data-id="nav.id">
                  <template v-for="it in nav.children" :key="it.id">
                    <div
                      v-if="it.type == 'icon'"
                      :id="it.id"
                      class="app-item grid-stack-item"
                      :gs-x="it.x"
                      :gs-y="it.y"
                      :gs-w="it.w"
                      :gs-h="it.h"
                      :gs-id="it.id"
                      @click="handleGridItemClick(it)"
                    >
                      <div
                        class="grid-stack-item-content flex flex-col items-center"
                      >
                        <div class="app-item-icon">
                          <img
                            class="app-item-img"
                            :style="getIconStyle(it)"
                            :src="it.src"
                          />
                        </div>
                        <p class="text-white-sm text-sm text-center">
                          {{ it.name }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-else-if="it.type == 'component'"
                      :id="it.id"
                      class="app-item1 grid-stack-item"
                      :gs-x="it.x"
                      :gs-y="it.y"
                      :gs-w="it.w"
                      :gs-h="it.h"
                      :gs-id="it.id"
                    >
                      <div
                        class="grid-stack-item-content flex flex-col items-center bg-[rgba(0,0,0,0.3)]"
                      >
                        <!-- <img
                          style="border-radius: 16px"
                          class="w-full h-full"
                          src="../../assets/test.jpg"
                          alt=""
                        /> -->
                        <component :is="it.component" :key="it.id" />
                      </div>
                    </div>
                  </template>
                </section>
              </main>
            </li>
          </transition>
        </template>
      </ul>
    </div>
    <AddWidget
      v-model:dialog-visible="addDialogVisible"
      @add="handleAddWidget"
    />
  </div>
</template>

<script setup lang="ts">
import { GridStack } from "gridstack";
import { ElMessage } from "element-plus";
import { useAppStoreWithOut } from "@/store/modules/app";
import AddWidget from "@/components/AddWidget/index.vue";
import type { IWidgetItem } from "#/config";

const appStore = useAppStoreWithOut();

const grids = shallowRef<GridStack[]>([]);
const addDialogVisible = ref<boolean>(false);

const navConfig = computed(() => appStore.getNavConfig);
const activeNav = computed(() => appStore.getActiveNav);

function handleGridItemClick(widget: IWidgetItem) {
  // addWidgetItem();
  console.info("🚀 ~ log:widget ----->", widget);
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
  console.info("🚀 ~ log:widget ----->", widget);
  const node: IWidgetItem = {
    ...widget,
    x: 0,
    y: 0,
    w: +widget.size.split("x")[1],
    h: +widget.size.split("x")[0],
  };
  activeNav.value?.children.push(node);
  const { id: activeNavId } = activeNav.value;
  const grid = grids.value.find((it) => it.el?.dataset.id === activeNavId);
  nextTick(() => {
    grid?.makeWidget(node.id);
  });
}

onMounted(() => {
  nextTick(() => {
    grids.value = GridStack.initAll({
      cellHeight: "90px",
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

function handleWidgetChange(event: any, changeItems: any[]) {
  console.info("🚀 ~ log:changeItems ----->", changeItems);
  for (const item of changeItems) {
    const { id, x, y } = item;
    const widget = activeNav.value?.children.find((it) => it.id === id);
    if (widget) {
      widget.x = x;
      widget.y = y;
    }
  }
}

onUnmounted(() => {
  if (grids.value) {
    grids.value.forEach((grid) => {
      grid.destroy();
    });
  }
});

function getIconStyle(it: IWidgetItem) {
  if (it.type === "icon") {
    return {
      "pointer-events": "none",
      "--icon-bg-color": it.backgroundColor,
      "--icon-fit": "contain",
    } as any;
  } else {
    return {};
  }
}
</script>

<style lang="less" scoped>
.app-icon-grid-wrap {
  flex: 1;
  transition: 0.1s ease;
  .app-icon-grid {
    max-width: var(--icon-max-width, 1350px);
    margin: 0 auto;
    padding: 45px;
    height: 100%;
    .app-item {
      list-style-type: none;
      -webkit-user-select: none;
      box-sizing: border-box;
      border-radius: 16px;
      padding: 0 15px 30px;
      display: flex;
      flex-direction: column;
      height: 100px;
    }
    .app-item-icon {
      position: relative;
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 16px;
      font-size: 12px;
      box-shadow: 0 0 5px #0000001a;
      transition: 0.2s;
      cursor: pointer;
      .app-item-img {
        display: block;
        object-fit: var(--icon-fit, cover);
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: var(--icon-bg-color);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(-100%);
}
</style>
