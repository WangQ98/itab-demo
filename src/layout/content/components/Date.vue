<template>
  <div class="flex flex-col items-center w-full mt-10">
    <h2 class="text-white text-7xl">{{ currentTime }}</h2>
    <p class="flex gap-2 text-white">
      <span>{{ date }}</span>
      <span>{{ lunarDate }}</span>
      <span>{{ week }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Lunar } from "lunar-typescript";
import { getFormatDate } from "@/utils/date";

const currentTime = ref(getFormatDate("HH:mm"));
const date = getFormatDate("MM月DD日");
const week = getFormatDate("dddd");

const updateTime = () => {
  currentTime.value = getFormatDate("HH:mm");
};

const d = Lunar.fromDate(new Date());
const lunarDate = `${d.getMonthInChinese()}月${d.getDayInChinese()}`;

setInterval(updateTime, 1000);
</script>

<style scoped></style>
