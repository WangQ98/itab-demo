<template>
  <div class="flex w-full h-full">
    <img
      class="w-full h-full rounded-[16px]"
      src="@/assets/images/widgets/todo.png"
      alt=""
    />
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "Todo3x5",
  size: IconSize.s3x5,
  type: IconType.component,
});
</script>

<style scoped lang="less"></style>
