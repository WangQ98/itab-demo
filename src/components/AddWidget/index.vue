<template>
  <el-dialog
    v-model="dialogVisible"
    class="d-dialog-model"
    width="70%"
    :append-to-body="true"
  >
    <div class="h-[550px]">
      <section class="flex h-full gap-[12px]">
        <aside class="w-80 h-full bg-white">
          <ul>
            <li>小组件</li>
            <li>网址导航</li>
            <li>自定义图标</li>
          </ul>
        </aside>
        <main class="flex-1 bg-[#f1f0f5]">
          <div>
            <el-tag
              v-for="category in IconCategory"
              :key="category"
              class="ml-2"
            >
              {{ category }}
            </el-tag>
          </div>
          <div class="widget-list-wrap grid grid-cols-2 gap-4 mt-10">
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
import itabMaterials from "@/utils/itabMaterials";
import { IconCategory } from "@/enums";
import CarouselBox from "../containerBox/carouselBox.vue";
import type { IWidget, IWidgetCategory } from "#/config";
const props = defineProps<{
  dialogVisible: boolean;
}>();

const emits = defineEmits<{
  (event: "update:dialogVisible", value: boolean): void;
}>();

const { dialogVisible } = useVModels(props, emits);

const categoryValue = ref<IWidgetCategory>(IconCategory.develop);

function mapIWidgetCategory(): IWidget[] {
  const categorySet = itabMaterials.getMaterials(categoryValue.value) || [];
  return [...categorySet];
}

function appendWidget(widget) {
  console.log(widget);
}
</script>

<style lang="less">
.d-dialog-model {
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
</style>
