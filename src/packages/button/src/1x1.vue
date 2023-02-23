<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-button>1x1</el-button>
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "Button1x1",
  size: IconSize.s1x1,
  type: IconType.component,
});
</script>

<style scoped></style>
