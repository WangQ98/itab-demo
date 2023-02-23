<template>
  <div class="widget-icon-item">
    <div class="app-icon-body">
      <div class="flex flex-col items-center">
        <h4 class="h-5 mb-2 mt-1 text-[16px] text-[#222]">
          {{ categoryWidget.title }}
        </h4>
        <div class="text-[#939393] text-[12px]">
          {{ categoryWidget.desc }}
        </div>
        <el-carousel
          class="w-full"
          indicator-position="outside"
          trigger="click"
          height="200px"
          :autoplay="false"
          @change="changeCarousel"
        >
          <el-carousel-item v-for="widget in widgets" :key="widget.name">
            <div class="w-full h-full flex items-center justify-center">
              <SizeBox :widget="widget" />
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="w-full flex justify-end">
          <el-button
            type="primary"
            size="small"
            round
            @click.stop="appendWidget"
          >
            添加
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SizeBox from "./sizeBox.vue";
import type { IWidget, IWidgetItem } from "#/config";
const props = defineProps<{
  categoryWidget: IWidget;
}>();

const $emit = defineEmits(["append-widget"]);

const widgets = computed<IWidgetItem[]>(
  () => props.categoryWidget?.widgets || []
);

const activeWidget = ref<IWidgetItem | null>(widgets.value?.[0] || null);

function changeCarousel(activeIdx: number) {
  activeWidget.value = widgets.value?.[activeIdx] || null;
}

function appendWidget() {
  $emit("append-widget", activeWidget.value);
}
</script>

<style scoped lang="less">
.widget-list-wrap {
  .widget-icon-item {
    border-radius: 12px;
    padding: 10px;
    background-color: #fff;
  }
}
</style>
