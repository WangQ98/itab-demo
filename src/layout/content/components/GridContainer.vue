<template>
  <div class="app-icon-grid">
    <ul class="h-full app-icon-wrap">
      <template v-for="nav in navConfig" :key="nav.id">
        <transition name="fade">
          <li v-show="activeNav.id == nav.id" class="h-full">
            <main class="h-full">
              <section class="h-full grid-stack" :data-id="nav.id">
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
                    @click="emits('add', it)"
                  >
                    <div
                      class="flex flex-col items-center h-full grid-stack-item-content"
                    >
                      <div class="app-item-icon">
                        <img
                          class="app-item-img"
                          :style="getIconStyle(it)"
                          :src="getAppIcon(it)"
                          @click="handleIconClick(it)"
                        />
                      </div>
                      <p
                        class="text-white-sm text-sm text-center pt-[8px] w-10/12 truncate"
                      >
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
                      class="flex flex-col items-center px-4 grid-stack-item-content"
                    >
                      <div class="w-full" style="height: calc(100% - 40px)">
                        <component
                          :is="it.component"
                          :key="it.id"
                          class="rounded-[16px]"
                        />
                      </div>
                      <p
                        class="text-white-sm text-sm text-center pt-[8px] w-full truncate"
                      >
                        {{ it.name }}
                      </p>
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
</template>

<script setup lang="ts">
import { useAppStoreWithOut } from "@/store/modules/app";
import useGridStack from "../useGridStack";
import type { IWidgetItem } from "#/config";

const { grids } = useGridStack();
const emits = defineEmits(["add"]);

const appStore = useAppStoreWithOut();
const activeNav = computed(() => appStore.getActiveNav);
const navConfig = computed(() => appStore.getNavConfig);

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

function handleIconClick(it: IWidgetItem) {
  window.open(it.url, "_blank");
}

function getAppIcon(it: IWidgetItem) {
  if (!it.src) {
    return;
  }
  if (it?.src.startsWith("http") || it?.src.startsWith("https")) {
    return it.src;
  }
  return new URL(`../../../assets/images/${it.src}`, import.meta.url).href;
}

defineExpose({
  grids,
});
</script>

<style lang="less" scoped>
.app-icon-grid {
  max-width: var(--icon-max-width, 1600px);
  margin: 0 auto;
  padding: 45px;
  height: 100%;

  .app-item {
    list-style-type: none;
    -webkit-user-select: none;
    box-sizing: border-box;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    height: 100px;
    padding: 0 0 10px;
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
  .grid-stack-item-content {
    inset: 0 !important;
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
