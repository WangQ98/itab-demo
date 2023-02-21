<template>
  <div class="app-icon-grid-wrap">
    <div class="app-icon-grid">
      <ul class="app-icon-wrap h-full">
        <template v-for="nav in navConfig" :key="nav.id">
          <transition name="fade">
            <li v-show="activeNav.id == nav.id" class="h-full">
              <main class="h-full">
                <section class="grid-stack h-full">
                  <template v-for="it in nav.children" :key="it.id">
                    <div
                      v-if="it.type == 'icon'"
                      class="app-item grid-stack-item"
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
                  </template>
                  <div
                    class="app-item1 grid-stack-item"
                    style="width: 330px !important; border-radius: 16px"
                    gs-w="3"
                    gs-h="2"
                  >
                    <div
                      class="grid-stack-item-content flex flex-col items-center"
                      style="height: 150px !important"
                    >
                      <img
                        style="border-radius: 16px"
                        class="w-full h-full"
                        src="../../assets/test.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </section>
              </main>
            </li>
          </transition>
        </template>
      </ul>
    </div>
    <AddWidget v-model:dialog-visible="addDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import { GridStack } from "gridstack";
import { ElMessage } from "element-plus";
import { useAppStoreWithOut } from "@/store/modules/app";
import AddWidget from "@/components/AddWidget/index.vue";
import type { IWidgetItem } from "#/config";

const appStore = useAppStoreWithOut();

const grids = ref<GridStack[]>([]);
const addDialogVisible = ref<boolean>(false);

const navConfig = computed(() => appStore.getNavConfig);
const activeNav = computed(() => appStore.getActiveNav);

function handleGridItemClick(widget: IWidgetItem) {
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

onMounted(() => {
  nextTick(() => {
    grids.value = GridStack.initAll({
      float: false,
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
    });
  });
});

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
