<script setup lang="ts">
import SideBar from "./sidebar/index.vue";
import GridContent from "./content/index.vue";
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
