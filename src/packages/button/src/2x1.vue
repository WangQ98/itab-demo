<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-button type="success">2x1</el-button>
  </div>
</template>

<script lang="ts">
import { IconSize, IconType } from "@/enums";
export default defineComponent({
  name: "Button2x1",
  size: IconSize.s2x1,
  type: IconType.component,
});
</script>

<style scoped></style>
