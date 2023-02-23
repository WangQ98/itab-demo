<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-button type="primary">1x2</el-button>
  </div>
</template>

<script lang="ts">
import { IconSize, IconType } from "@/enums";
export default defineComponent({
  name: "Button1x2",
  size: IconSize.s1x2,
  type: IconType.component,
});
</script>

<style scoped></style>
