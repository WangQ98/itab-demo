<template>
  <div class="flex w-full h-full">
    <el-carousel class="w-full h-full">
      <el-carousel-item class="w-full h-full">
        <img
          class="w-full h-full rounded-[16px] object-cover"
          src="@/assets/images/widgets/banner1.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item class="w-full h-full">
        <img
          class="w-full h-full rounded-[16px] object-cover"
          src="@/assets/images/widgets/banner2.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item class="w-full h-full">
        <img
          class="w-full h-full rounded-[16px] object-cover"
          src="@/assets/images/widgets/banner3.png"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import { IconSize, IconType } from "@/enums";

defineOptions({
  name: "Banner3x5",
  size: IconSize.s3x5,
  type: IconType.component,
});
</script>

<style scoped lang="less"></style>
