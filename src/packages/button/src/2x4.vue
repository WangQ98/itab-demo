<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-button type="danger">2x4</el-button>
  </div>
</template>

<script lang="ts">
import { IconSize, IconType } from "@/enums";
export default defineComponent({
  name: "Button2x4",
  size: IconSize.s2x4,
  type: IconType.component,
});
</script>

<style scoped></style>
