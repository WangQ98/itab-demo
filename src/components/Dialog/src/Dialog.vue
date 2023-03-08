<template>
  <el-dialog
    v-model="dialogVisible"
    :fullscreen="isFullScreen"
    class="f-dialog-model"
    :width="width"
    :append-to-body="true"
  >
    <div class="f-dialog-header">
      <div class="f-dialog-tool">
        <span @click="isFullScreen = !isFullScreen">
          <i class="is-mac i-carbon:add" />
        </span>
        <span @click="dialogVisible = false">
          <i class="is-mac i-carbon:close" />
        </span>
      </div>
    </div>
    <div class="f-dialog-body" :style="{ height }">
      <el-container class="f-layout">
        <el-aside width="160px" class="h-full">
          <slot name="aside" />
        </el-aside>
        <el-main
          style="overflow: scroll; padding: 0px; background-color: #171819"
        >
          <slot name="main" />
        </el-main>
      </el-container>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "1000px",
  },
  height: {
    type: String,
    default: "600px",
  },
});

const emit = defineEmits(["update:modelValue"]);

const dialogVisible = useVModel(props, "modelValue", emit);

const isFullScreen = ref<boolean>(false);
</script>

<style lang="less">
.f-dialog-model {
  border-radius: 6px;
  overflow: auto;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
    background-color: #171819;
  }
  .f-dialog-body {
    height: 600px;
    .f-layout {
      width: 100%;
      height: 100%;
    }
  }

  .f-dialog-header {
    .f-dialog-tool {
      position: absolute;
      top: 10px;
      right: 10px;
      span {
        line-height: 12px;
        font-size: 14px;
        color: #333;
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 12px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-child {
          background-color: #1aab29;
        }
        &:last-child {
          background-color: #ff5f56;
        }
        .is-mac {
          display: none;
        }
      }
      &:hover .is-mac {
        display: block;
      }
    }
  }
}
</style>
