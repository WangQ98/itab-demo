<template>
  <div
    class="w-full h-full bg-[#111] flex flex-col items-center justify-center color-[#fff]"
    @click.stop="dialogVisible = true"
  >
    <span>
      {{ currentTime }}
    </span>
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
import { getFormatDate } from "@/utils/date";
import { IconSize, IconType } from "@/enums";
import itmeCenter from "./timeCenter.vue";

const dialogVisible = ref(false);
const currentTime = ref(getFormatDate("HH:mm"));

defineOptions({
  name: "worldTime1x1",
  size: IconSize.s1x1,
  type: IconType.component,
});
</script>

<style scoped></style>
