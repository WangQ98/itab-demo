<template>
  <Dialog v-model="dialogVisible">
    <template #aside>
      <div class="w-full h-full pt-[60px] p-[10px]">
        <ul class="aside-list">
          <li
            v-for="it in tabs"
            :key="it.id"
            class="aside-item"
            :class="{ active: it.id == activeTab.id }"
            @click="activeTab = it"
          >
            {{ it.label }}
          </li>
        </ul>
      </div>
    </template>
    <template #main>
      <div class="h-full px-[10px] overflow-scroll">
        <component
          :is="activeTab.component"
          @add="($event: Event) => $emit('add', $event)"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from "@/components/Dialog";
import Widget from "./components/Widget.vue";
import UrlNavigation from "./components/UrlNavigation.vue";
import CustomIcon from "./components/CustomIcon.vue";
import type { IWidgetItem } from "#/config";
import type { Component } from "vue";

interface ITab {
  id: string;
  icon: string;
  label: string;
  component: Component;
}

const tabs: ITab[] = [
  {
    id: "1",
    icon: "",
    label: "小组件",
    component: Widget,
  },
  {
    id: "2",
    icon: "",
    label: "网址导航",
    component: UrlNavigation,
  },
  {
    id: "3",
    icon: "",
    label: "自定义图标",
    component: CustomIcon,
  },
];

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "add", value: IWidgetItem): void;
}>();

const dialogVisible = useVModel(props, "modelValue", emit);

const activeTab = shallowRef<ITab>(tabs[0]);
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
    padding: 12px 18px;
    &:hover {
      color: @active-color;
    }
    &.active {
      transition: color 0.2s;
      color: #1890ff;
      border-color: #1890ff;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 6px;
    }
  }
}
</style>
