<template>
  <div class="flex w-full py-4 gap-2">
    <!-- <ul class="category-wrap flex">
      <li
        v-for="category in IconCategory"
        :key="category"
        class="mr-[12px]"
        @click="switchTag(category)"
      >
        <el-tag class="cursor-pointer" round>
          {{ category }}
        </el-tag>
      </li>
    </ul> -->
    <div class="widget-list-wrap grid grid-cols-2 gap-4">
      <CarouselBox
        v-for="(categoryWidget, idx) in mapIWidgetCategory()"
        :key="idx"
        style="background-color: rgba(255, 255, 255, 0.07)"
        :category-widget="categoryWidget"
        @append-widget="appendWidget"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateUUID } from "@/utils";
import itabMaterials from "@/utils/itabMaterials";
import { IconCategory } from "@/enums";
import CarouselBox from "../../ContainerBox/index.vue";
import type { IWidgetCategory, IWidgetComponent, IWidgetItem } from "#/config";

const { proxy } = useCurrentInstance();
const emit = defineEmits(["add"]);

const categoryValue = ref<IWidgetCategory>(IconCategory.develop);

function mapIWidgetCategory() {
  const categorySet = itabMaterials.getMaterials(categoryValue.value) || [];
  return [...categorySet];
}

function appendWidget(widget: IWidgetComponent, label: string) {
  emit("add", widgetFactory(widget, label));
}

// function switchTag(category: IWidgetCategory) {
//   categoryValue.value = category;
// }

function widgetFactory(widget: IWidgetComponent, label: string): IWidgetItem {
  if (!widget) {
    return proxy?.$message.error("当前组件为null");
  }
  return {
    id: generateUUID(),
    name: label,
    component: widget.name || null,
    size: widget.size,
    type: widget.type,
  };
}
</script>

<style scoped></style>
