<template>
  <ul class="grid grid-cols-3 w-full py-10 gap-5">
    <li v-for="it in urlData" :key="it.id" class="widget-item">
      <el-card shadow="always">
        <div class="flex">
          <img class="widget-item-img" src="@/assets/images/link_default.png" />
          <div class="widget-item-content">
            <div class="flex w-full justify-between">
              <h5 class="w-30 text-[#dfdddd] truncate" :title="it.name">
                {{ it.name }}
              </h5>
              <i
                class="i-carbon:link text-[#dfdddd] cursor-pointer"
                @click="handleClickLink(it)"
              />
            </div>
            <div class="widget-item-desc" :title="it.desc">
              {{ it.desc }}
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-2">
          <el-button
            round
            size="small"
            style="background-color: transparent; color: #dfdddd"
            @click="handleClickAdd(it)"
            >添加</el-button
          >
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { urlData } from "@/store/mock/url";
import type { IWidgetItem } from "#/config";

const emit = defineEmits(["add"]);

function handleClickLink(it: IWidgetItem) {
  window.open(it.url);
}

function handleClickAdd(it: IWidgetItem) {
  emit("add", it);
}
</script>

<style lang="less">
.widget-item {
  .el-card {
    border: none;
    background-color: rgba(255, 255, 255, 0.07) !important;
  }
  &-img {
    margin-right: 10px;
    border-radius: 14px;
    width: 58px;
    height: 58px;
    box-shadow: 0 0 10px 3px #0000001a;
  }
  &-content {
    width: 100%;
  }
  &-desc {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>
