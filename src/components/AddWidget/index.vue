<template>
  <Dialog v-model="dialogVisible">
    <template #aside>
      <div class="w-50 h-full bg-white pt-[60px] p-[10px]">
        <ul class="aside-list">
          <li>小组件</li>
          <li>网址导航</li>
          <li>自定义图标</li>
        </ul>
      </div>
    </template>
    <template #main>
      <div class="flex-1 bg-[#f1f0f5] px-[10px] overflow-scroll">
        <div class="flex w-full py-4 gap-2" />
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
            :category-widget="categoryWidget"
            @append-widget="appendWidget"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { generateUUID } from "@/utils";
import itabMaterials from "@/utils/itabMaterials";
import { IconCategory } from "@/enums";
import { Dialog } from "@/components/Dialog";
import CarouselBox from "../ContainerBox/index.vue";
import type { IWidgetCategory, IWidgetComponent, IWidgetItem } from "#/config";

const props = defineProps<{
  modelValue: boolean;
}>();

const { proxy } = useCurrentInstance();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "add", value: IWidgetItem): void;
}>();

const dialogVisible = useVModel(props, "modelValue", emit);

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

<style lang="less" scoped>
.category-wrap {
  white-space: nowrap;
  overflow-y: auto;
  list-style: none;
  margin: 12px 0;
}
.aside-list {
  cursor: pointer;
  list-style: none;
  li {
    margin: 5px 0;
    padding: 12px 1px;
    &:hover {
      color: @active-color;
    }
  }
}
.active {
  color: @active-color;
}
</style>
