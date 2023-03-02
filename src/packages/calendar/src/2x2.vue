<template>
  <div class="w-full h-full bg-white calendar-container">
    <div class="text-lg text-white calendar-title h-1/4 flex-center">
      {{ yearMonth }}
    </div>
    <div class="text-5xl font-bold h-1/2 flex-center">{{ currentDay }}</div>
    <div class="h-1/4 calendar-desc">
      <p>{{ currentDateString }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { getNowDateFormattedChineseDate } from "@/utils/date";
import { IconSize, IconType } from "@/enums";

const yearMonth = dayjs().format("YYYY年MM月");
const currentDay = dayjs().format("DD");

const currentDateString = getNowDateFormattedChineseDate();

defineOptions({
  name: "Calender2x2",
  size: IconSize.s2x2,
  type: IconType.component,
});
</script>

<style scoped lang="less">
.calendar-container {
  .calendar-title {
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    background-color: rgb(255, 90, 93);
  }
  .calendar-desc {
    text-align: center;
    color: rgb(153, 153, 153);
  }
}
</style>
