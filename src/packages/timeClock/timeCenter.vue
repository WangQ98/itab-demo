<template>
  <div class="flex flex-col font-time">
    <!-- <div class="w-full flex justify-end">
      <span class="flex items-center">搜索：</span>
      <el-input
        v-model="searchLocal"
        placeholder="输入城市"
        style="width: 30%"
      />
    </div> -->
    <!-- show time -->
    <p class="curr-place-time w-full text-center px-[60px]">
      <time>{{ currentTime }}</time>
    </p>
    <p class="sub-time-msg w-full text-end px-[60px]">
      {{ getTimeMsg() }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { getFormatDate } from "@/utils/date";

// const searchLocal = ref("");
const currentTime = ref(getFormatDate("HH:mm:ss"));
const timeStamp = ref<number | null>(null);

onMounted(() => {
  timeStamp.value = window?.setInterval(() => {
    currentTime.value = getFormatDate("HH:mm:ss");
  }, 1000);
});
onUnmounted(() => {
  timeStamp.value && clearInterval(timeStamp.value);
});

function getTimeMsg() {
  return getFormatDate("YYYY/MM/DD").replace(
    /(\d+)\/(\d+)\/(\d+)/g,
    "$1年$2月$3日"
  );
}

defineExpose({
  currentTime,
});
</script>

<style scoped lang="less">
.font-time {
  font-family: PingFang SC, -apple-system, BlinkMacSystemFont, Helvetica Neue,
    Helvetica, sans-serif;
}
.curr-place-time {
  font-size: 160.769px;
  line-height: 160.769px;
  margin-top: 6%;
  font-weight: 700;
  color: @d-main;
}
.sub-time-msg {
  font-size: 16px;
  color: @d-sub;
}
</style>
