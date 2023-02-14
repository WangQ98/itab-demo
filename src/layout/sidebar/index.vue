<template>
  <div class="app-sidebar">
    <div class="app-sidebar-body">
      <div class="mt-10 mb-10 cursor-pointer flex items-center flex-col">
        <img
          class="w-8 h-8 object-cover rounded-1/2"
          src="https://files.codelife.cc/itab.link/logo/avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100"
        />
        <p class="mt-2">登录</p>
      </div>

      <div class="app-sidebar-group">
        <ul class="app-sidebar-ul">
          <li
            v-for="it in navConfig"
            :key="it.id"
            :class="{ active: activeNav.id === it.id }"
            class="app-group-item"
            @click="appStore.setActiveNav(it)"
          >
            <div>
              <i :class="it.icon" class="app-group-item-icon" />
              <p>{{ it.name }}</p>
            </div>
          </li>
        </ul>
        <el-popover
          v-model:visible="popoverVisible"
          :width="260"
          placement="right"
          trigger="click"
          effect="dark"
          title="添加分组"
          popper-class="app-group-popover"
        >
          <template #reference>
            <li ref="buttonRef" class="app-group-item">
              <div>
                <i class="i-carbon:add !text-2xl" />
              </div>
            </li>
          </template>
          <h5 class="text-xs">图标</h5>
          <ul class="app-group-icon">
            <li
              v-for="it in icons"
              :key="it"
              :class="{ active: activeIcon == it }"
              class="app-group-icon-item"
              @click="activeIcon = it"
            >
              <i :class="it" class="d-icon" style="font-size: 16px" />
            </li>
          </ul>
          <h5 class="text-sm my-2">名称</h5>
          <el-input
            v-model="name"
            class="w-50 app-group-input"
            size="small"
            placeholder="名称"
          />
          <div class="mt-2">
            <el-button size="small" type="primary" @click="saveSideBar"
              >保存</el-button
            >
            <el-button size="small" @click="popoverVisible = false"
              >取消</el-button
            >
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStoreWithOut } from "@/store/modules/app";
import { createNav } from "@/utils/app";

// @unocss-include
const icons = [
  "i-carbon:center-to-fit",
  "i-carbon:choropleth-map",
  "i-carbon:favorite-filled",
  "i-carbon:group-presentation",
  "i-carbon:haze",
  "i-carbon:grid",
  "i-carbon:repo-source-code",
  "i-carbon:save-annotation",
  "i-carbon:send-alt-filled",
  "i-carbon:storage-pool",
];

const appStore = useAppStoreWithOut();

const navConfig = $ref(appStore.getNavConfig);
const buttonRef = $ref(null);
let popoverVisible = $ref(false);

const name = $ref("");

const activeIcon = $ref("");

const activeNav = computed(() => appStore.getActiveNav);

function saveSideBar() {
  const nav = createNav(name, activeIcon);
  appStore.addNav(nav);
  popoverVisible = false;
}
</script>
<style lang="less">
.app-group-popover {
  background-color: rgba(@img-bg, 0.8) !important;
  box-shadow: 0 12px 24px #0000002e !important;
  backdrop-filter: blur(18px);
  color: rgba(@img-text, 0.8) !important;
  .app-group-icon {
    display: grid;
    color: rgba(@img-text, 0.6) !important;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-flow: dense;
    grid-gap: 5px;

    &-item {
      width: 100%;
      padding-bottom: 100%;
      position: relative;
      border-radius: 5px;
      transition: 0.2s;
      &.active {
        background-color: #fff3;
        color: rgba(@img-text, 0.9) !important;
      }
      &:hover {
        cursor: pointer;
        background-color: #ffffff1a;
      }
      .d-icon {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  .app-group-input {
    .el-input__wrapper {
      --el-input-text-color: rgba(@img-text, 1) !important;
      background-color: rgba(@img-text, 0.1);
      border: none;
      input::--webkit-input-placeholder {
        color: rgba(@img-text, 0.6) !important;
      }
    }
  }
  .el-popover__title {
    color: rgba(@img-text, 0.8) !important;
  }
  .el-popper__arrow:before {
    background-color: rgba(@img-bg, 0.8) !important;
  }
}
</style>

<style lang="less" scoped>
.app-sidebar {
  width: @sidebar-width;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  &-body {
    transition: 0.1s;
    text-align: center;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: rgba(@img-text, 0.6);
    backdrop-filter: blur(4px);
    background-color: rgba(@img-bg, @sidebar-opacity);
  }
  &-group {
    @apply flex-1;
    .app-group-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 4px 0;
      height: 50px;
      transition: background 0.3s;
      &-title {
        width: @sidebar-width;
        padding: 4px 4px 0;
      }
      &-icon {
        font-size: 18px;
        transition: transform 0.2s;
      }
      &.active {
        background-color: #ffffff26;
      }
      &:hover {
        cursor: pointer;
        .app-group-item-icon {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
