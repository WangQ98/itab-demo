<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-input value="2x1" />
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "input2x1",
  size: IconSize.s2x1,
  type: IconType.component,
});
</script>

<style scoped></style>
