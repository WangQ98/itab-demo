<template>
  <div class="flex w-full h-full bg-white">
    <div class="w-[40%] h-full py-6 pl-6">
      <div
        class="w-full h-full calendar-container rounded-[16px] shadow-md shadow-gray-300"
      >
        <div class="text-sm text-white calendar-title h-1/4 flex-center">
          {{ yearMonth }}
        </div>
        <div class="text-4xl font-bold h-1/2 flex-center">{{ currentDay }}</div>
        <div class="text-sm h-1/4 calendar-desc">
          <p>{{ currentDateString }}</p>
        </div>
      </div>
    </div>
    <div class="flex-1 p-3">
      <div class="w-full h-full">
        <div class="f-calendar">
          <ul class="f-calendar-week">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
          <ul class="f-calendar-body">
            <li v-for="(it, id) in days" :key="it">
              <span
                :class="[
                  { isToday: it == +today },
                  {
                    'opacity-full':
                      currentMonthWeekDays.includes(it) &&
                      id >= firstDayToLastSunday &&
                      id < 35 - nextMonthDays.length,
                  },
                ]"
                class="opacity-5"
                >{{ it }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";
import {
  getCurrentMonthDays,
  getDaysFromFirstDayToLastSunday,
  getFormatDate,
  getLastMonthLastDays,
  getWeekdayDates,
} from "@/utils/date";
import useDate from "./useDate";

// 上个月的天数
const firstDayToLastSunday = getDaysFromFirstDayToLastSunday();
// 这个月的天数
const currentMonthDay = getCurrentMonthDays();

// 上个月的日期数组
const lastMonthDays = getLastMonthLastDays(firstDayToLastSunday).reverse();
// 当前月的日期数组
const currentMonthDays = Array.from(
  { length: currentMonthDay },
  (_, i) => i + 1
);
// 下个月的日期数组
const nextMonthDays = Array.from(
  { length: 35 - (firstDayToLastSunday + currentMonthDays.length) },
  (_, i) => i + 1
);

// 最终形成的35长度的日期数组
const days = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];

// 当前这个月不是周末的日期
const currentMonthWeekDays = getWeekdayDates();

const { yearMonth, currentDay, currentDateString } = useDate();

// 今天的日期
const today = getFormatDate("D");

const nextMonthDaysMaps = function () {
  const map = new Map();

  nextMonthDays.forEach((it, id) => {
    map.set(it, id);
  });
};

nextMonthDaysMaps();

defineOptions({
  name: "Memo2x4",
  size: IconSize.s2x4,
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

.f-calendar {
  padding: 8px 0;
  &-week {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    height: 1.1em;
    font-size: 14px;
  }
  &-body {
    display: grid;
    grid-template-columns: repeat(7, 14.285%);
    font-size: 12px;
    text-align: center;
    height: calc(100% - 1.8em);
    width: 100%;
    margin-top: 8px;
    line-height: 1.4rem;
  }
  .isToday {
    border-bottom: 2px solid #ff5a5d;
  }
  .opacity-5 {
    opacity: 0.5;
  }

  .opacity-full {
    opacity: 1 !important;
  }
}
</style>
