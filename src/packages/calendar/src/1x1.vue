<template>
  <div class="w-full h-full bg-white calendar-container">
    <p class="flex flex-col items-center justify-center h-full">
      <span class="text-[12px] color-[#d83030]">{{ week }}</span>
      <span class="text-2xl font-bold">{{ day }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";
import { getDayOfWeek, getFormatDate } from "@/utils/date";

const week = getDayOfWeek();
const day = getFormatDate("DD");

defineOptions({
  name: "Calender1x1",
  size: IconSize.s1x1,
  type: IconType.component,
});
</script>

<style scoped lang="less">
.calendar-container {
}
</style>
