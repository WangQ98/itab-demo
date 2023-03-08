<template>
  <Dialog v-model="dialogVisible">
    <template #aside>
      <div class="w-full h-full">1111</div>
    </template>
    <template #main>
      <div class="w-full h-full bg-white p-3">222</div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from "@/components/Dialog";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const dialogVisible = useVModel(props, "modelValue", emit);
</script>

<style scoped></style>
