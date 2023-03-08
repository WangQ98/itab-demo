<template>
  <div class="w-full h-full bg-white calendar-container">
    <p class="flex items-center justify-center h-full">
      <span class="text-xl mr-2">{{ day }}</span>
      <span class="text-lg color-[#d83030]">{{ week }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";
import { getDayOfWeek, getFormatDate } from "@/utils/date";

const week = getDayOfWeek();
const day = getFormatDate("MM/DD");

defineOptions({
  name: "Memo1x2",
  size: IconSize.s1x2,
  type: IconType.component,
});
</script>

<style scoped lang="less">
.calendar-container {
}
</style>
