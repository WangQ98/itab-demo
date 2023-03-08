<template>
  <div class="w-full h-full bg-white calendar-container">
    <p class="flex flex-col items-center justify-between h-full py-6">
      <span class="text-sm">{{ yearMonth }}</span>
      <span class="text-4xl font-bold">{{ day }}</span>
      <span class="text-sm color-[#d83030]">{{ week }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";
import { getDayOfWeek, getFormatDate } from "@/utils/date";

const week = getDayOfWeek();
const yearMonth = getFormatDate("YYYY/MM");
const day = getFormatDate("DD");

defineOptions({
  name: "Calender2x1",
  size: IconSize.s2x1,
  type: IconType.component,
});
</script>

<style scoped lang="less">
.calendar-container {
}
</style>
