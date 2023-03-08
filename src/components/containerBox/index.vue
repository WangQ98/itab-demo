<template>
  <div class="widget-icon-item">
    <div class="app-icon-body">
      <div class="flex flex-col items-center">
        <h4 class="h-5 mb-2 mt-1 text-[16px] text-white">
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
            <div class="flex items-center justify-center w-full h-full">
              <SizeBox :widget="widget" />
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="flex justify-end w-full">
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
import SizeBox from "./SizeBox.vue";
import type { Ref } from "vue";
import type { IWidget, IWidgetComponent } from "#/config";

const props = defineProps<{
  categoryWidget: IWidget;
}>();

const $emit = defineEmits<{
  (
    event: "append-widget",
    widget: IWidgetComponent | null,
    label: string
  ): void;
}>();

const widgets = computed(() => props.categoryWidget?.widgets || []) as Ref<
  IWidgetComponent[]
>;

const activeWidget = ref<IWidgetComponent | null>(widgets.value?.[0] || null);

function changeCarousel(activeIdx: number) {
  activeWidget.value = widgets.value?.[activeIdx] || null;
}

function appendWidget() {
  $emit("append-widget", activeWidget.value, props.categoryWidget?.label);
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
