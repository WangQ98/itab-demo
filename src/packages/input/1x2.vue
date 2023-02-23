<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-input value="1x2" />
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "input1x2",
  size: IconSize.s1x2,
  type: IconType.component,
});
</script>

<style scoped></style>
