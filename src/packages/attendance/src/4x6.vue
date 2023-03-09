<template>
  <div class="flex w-full h-full">
    <img class="w-full h-full" src="@/assets/images/widgets/3.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "Attendance4x6",
  size: IconSize.s4x6,
  type: IconType.component,
});
</script>

<style scoped lang="less"></style>
