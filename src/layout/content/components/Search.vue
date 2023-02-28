<template>
  <div class="flex justify-center pt-7">
    <div
      class="w-[568px] bg-[rgba(255,255,255,0.6)] flex items-center rounded-[12px] relative"
    >
      <div class="h-full w-[48px] flex items-center justify-center">
        <div class="hover:bg-white rounded-[8px] cursor-pointer">
          <section
            class="w-[28px] h-[28px] bg-cover"
            style="
              background-color: rgba(0, 0, 0, 0);
              background-image: url('https://infinity-permanent.infinitynewtab.com/infinity/search-add/baidu.png?imageMogr2/thumbnail/48x/format/webp/blur/1x0/quality/100|imageslim');
            "
          />
        </div>
      </div>
      <input
        v-model="searchValue"
        class="flex-1 h-[48px] bg-[transparent] placeholder:text-color-t1 placeholder:text-opacity-40"
        type="search"
        autocomplete="off"
        placeholder="输入搜索内容"
        @keyup.enter.stop="search"
      />
      <div
        v-show="showCloseButtonFlag"
        class="close-button absolute right-0 top-0 h-full flex items-center px-2"
        @click="searchValue = ''"
      >
        <button class="w-[32px] h-[32px] flex justify-center items-center">
          <i class="i-carbon:close-filled" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash-es";
const searchValue = ref<string>("");
const showCloseButtonFlag = ref<boolean>(false);

watch(
  searchValue,
  debounce(() => {
    showCloseButtonFlag.value = !!searchValue.value;
  }, 500)
);

function search() {
  window.open(
    `https://www.baidu.com/s?tn=68018901_45_oem_dg&ie=utf-8&wd=${encodeURIComponent(
      searchValue.value
    )}`
  );
}
</script>

<style lang="less" scoped>
input[type="search"] {
  -webkit-border-image: none;
  -webkit-appearance: none;
  outline-offset: -2px;
  color: rgb(28 28 30);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

form:focus-within {
  background-color: rgba(255, 255, 255, 0.8);
}

input[type="search"]:focus {
  outline: none;
}

input[type="search"]::placeholder {
  font-size: 13px;
  font-weight: 500;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: none;
}
</style>
