<template>
  <div
    class="w-full h-full !bg-[#111] flex flex-col items-center justify-center color-[#fff]"
    @click.stop="dialogVisible = true"
  >
    <span class="text-4xl">
      {{ currentTime }}
    </span>
    <p class="flex mt-4 items-center gap-2">
      <span class="text-lg">{{ currentDate }}</span>
      <span>{{ currentWeek }}</span>
    </p>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      append-to-body
      width="70%"
    >
      <itmeCenter :time-zone="8" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getDayOfWeek, getFormatDate } from "@/utils/date";
import { IconSize, IconType } from "@/enums";
import itmeCenter from "./timeCenter.vue";

const dialogVisible = ref(false);
const currentTime = ref(getFormatDate("HH:mm"));
const currentDate = getFormatDate("MM/DD");
const currentWeek = getDayOfWeek();

const timeStamp = ref(0);

onMounted(() => {
  timeStamp.value = window?.setInterval(() => {
    currentTime.value = getFormatDate("HH:mm");
  }, 1000);
});
onUnmounted(() => {
  timeStamp.value && clearInterval(timeStamp.value);
});

defineOptions({
  name: "worldTime2x2",
  size: IconSize.s2x2,
  type: IconType.component,
});
</script>

<style scoped lang="less"></style>
