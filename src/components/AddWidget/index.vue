<template>
  <el-dialog
    v-model="dialogVisible"
    class="d-dialog-model"
    width="70%"
    :append-to-body="true"
  >
    <div class="h-[550px]">
      <section class="flex h-full">
        <aside class="w-50 h-full bg-white pt-[60px]">
          <div class="p-[10px]">
            <ul class="aside-list">
              <li>小组件</li>
              <li>网址导航</li>
              <li>自定义图标</li>
            </ul>
          </div>
        </aside>
        <main class="flex-1 bg-[#f1f0f5] px-[10px] overflow-scroll">
          <div class="flex w-full py-2 gap-2" />
          <ul class="category-wrap flex">
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
          </ul>
          <div class="widget-list-wrap grid grid-cols-2 gap-4">
            <template
              v-for="(categoryWidget, idx) in mapIWidgetCategory()"
              :key="idx"
            >
              <CarouselBox
                :category-widget="categoryWidget"
                @append-widget="appendWidget"
              />
            </template>
          </div>
        </main>
      </section>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { generateUUID } from "@/utils";
import itabMaterials from "@/utils/itabMaterials";
import { IconCategory } from "@/enums";
import CarouselBox from "../containerBox/carouselBox.vue";
import type {
  IWidget,
  IWidgetCategory,
  IWidgetComponent,
  IWidgetItem,
} from "#/config";
const props = defineProps<{
  dialogVisible: boolean;
}>();

const { proxy } = getCurrentInstance();

const emits = defineEmits<{
  (event: "update:dialogVisible", value: boolean): void;
  (event: "add", value: IWidgetItem): void;
}>();

const { dialogVisible } = useVModels(props, emits);

const categoryValue = ref<IWidgetCategory>(IconCategory.develop);

function mapIWidgetCategory(): IWidget[] {
  const categorySet = itabMaterials.getMaterials(categoryValue.value) || [];
  return [...categorySet];
}

function appendWidget(widget: IWidgetComponent | null, label: string) {
  emits("add", widgetFactory(widget, label));
}

function switchTag(category: IWidgetCategory) {
  categoryValue.value = category;
}

function widgetFactory(
  widget: IWidgetComponent | null,
  label: string
): IWidgetItem {
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

<style lang="less">
.d-dialog-model {
  border-radius: 6px;
  overflow: auto;
  .el-dialog__header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 5px;
    text-align: center;
    color: #222;
    z-index: 9;
  }
  .el-dialog__body {
    padding: 0;
    background-color: #f1f0f5;
  }
}
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
