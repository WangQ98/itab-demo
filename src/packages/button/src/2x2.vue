<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-button type="warning">2x2</el-button>
  </div>
</template>

<script lang="ts">
import { IconSize, IconType } from "@/enums";
export default defineComponent({
  name: "Button2x2",
  size: IconSize.s2x2,
  type: IconType.component,
});
</script>

<style scoped></style>
