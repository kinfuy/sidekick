<template>
  <div class="app-store-setting">
    <div class="store-list-content">
      <div v-for="app in allCustomApps" :key="app.name" class="store-list">
        <div class="list-left">
          <div class="logo-warper">
            <img class="app-logo" :src="app.logo" :title="app.description" />
          </div>
          <div>{{ app.title }}</div>
        </div>
        <div class="list-right">
          <ElButton @click="() => installApp(app.name, true)">{{
            isAppInstall(app.name) ? '卸载' : '安装'
          }}</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '@store/useApp';
import { ElButton } from 'element-plus';

const { allCustomApps, isAppInstall, installApp } = useApp();
</script>

<style lang="less" scoped>
.store-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #f4f4f4;
  .list-left {
    display: flex;
    align-items: center;

    .logo-warper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border: 1px solid #f4f4f4;
      border-radius: 8px;
      margin-right: 8px;
      .app-logo {
        width: 30px;
        height: 30px;
        border-radius: 4px;
      }
    }
  }
}
</style>
