<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
// @ts-ignore
import locale from "element-plus/dist/locale/zh-cn.mjs";
</script>
