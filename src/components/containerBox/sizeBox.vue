<template>
  <div class="app-item-icon" :style="containerBox">
    <component :is="widget" />
  </div>
</template>

<script setup lang="ts">
import { IconSize } from "@/enums";
import type { IWidgetComponent, IWidgetSize } from "#/config";
const props = defineProps<{
  widget: IWidgetComponent;
}>();

const widget = computed<IWidgetComponent | null>(() => props.widget || null);

const containerBox = ref({
  "--size-x": 1,
  "--size-y": 1,
});

watchEffect(() => {
  widget.value && generateSize(widget.value?.size || IconSize.s1x1);
});

function generateSize(size: IWidgetSize) {
  const sizeYX = size?.split("x") || [];
  const [y, x] = sizeYX;
  containerBox.value = {
    "--size-x": Number(x),
    "--size-y": Number(y),
  };
}
</script>

<style scoped lang="less">
.app-item-icon {
  position: relative;
  overflow: hidden;
  border-radius: @icon-radius;
  font-size: 12px;
  box-shadow: 0 0 5px #0000001a;
  cursor: pointer;
  background-color: transparent;
  overflow: hidden;
  box-shadow: @box-shaow rgba(0, 0, 0, 0.1);

  transition: 0.2s;

  width: calc(var(--size-x) * @icon-size);
  height: calc(var(--size-y) * @icon-size);

  &:hover {
    transform: scale(1.1, 1.1);
  }
}
</style>
