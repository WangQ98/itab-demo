<template>
  <div
    class="w-full h-full bg-white calendar-container"
    v-bind="$attrs"
    @click="dialogVisible = true"
  >
    <p class="flex flex-col items-center justify-center h-full">
      <span class="text-[12px] color-[#d83030]">备忘录</span>
    </p>
  </div>

  <Memo v-model="dialogVisible" />
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";
import Memo from "./components/Memo.vue";

const dialogVisible = ref<boolean>(false);

defineOptions({
  name: "Memo1x1",
  size: IconSize.s1x1,
  type: IconType.component,
});
</script>

<style scoped lang="less">
.calendar-container {
}
</style>
