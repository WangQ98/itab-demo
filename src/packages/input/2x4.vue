<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-input value="2x4" />
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "input1x1",
  size: IconSize.s2x4,
  type: IconType.component,
});
</script>

<style scoped></style>
