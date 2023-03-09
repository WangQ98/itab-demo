<script setup lang="ts">
// import { useAppStoreWithOut } from "@/store/modules/app";
import SideBar from "./sidebar/index.vue";
import GridContent from "./content/index.vue";

// const appStore = useAppStoreWithOut();

// function unLoadEffect() {
//   sessionStorage.setItem("navConfig", JSON.stringify(appStore.getNavConfig));
// }

// onMounted(() => {
//   window.addEventListener("beforeunload", unLoadEffect);
// });
// onUnmounted(() => {
//   window.removeEventListener("beforeunload", unLoadEffect);
// });
</script>

<template>
  <div class="app-container">
    <SideBar />
    <GridContent />
  </div>
</template>

<style lang="less" scoped>
.app-container {
  position: relative;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-flow: column;
}
</style>
