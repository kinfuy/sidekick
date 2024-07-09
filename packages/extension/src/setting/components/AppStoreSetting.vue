<template>
  <div class="app-store-setting">
    <div class="store-list-content">
      <div v-for="app in allCustomApps" :key="app.name" class="store-list">
        <div class="list-left">
          <div class="logo-warper">
            <img class="app-logo" :src="app.logo" :title="app.description" />
          </div>
          <div class="app-info">
            <div>{{ app.title }}</div>
            <div class="app-size">缓存：{{ appSizeMap.get(app.name) }}</div>
          </div>
        </div>
        <div class="list-right">
          <ElButton size="small" @click="() => clearStorage(app.name)">
            清除缓存
          </ElButton>
          <ElButton size="small" @click="() => installApp(app.name, true)">{{
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
import { transformBytes } from '@utils/transform';
import { reactive, ref } from 'vue';

const {
  allCustomApps,
  isAppInstall,
  installApp,
  clearStorage,
  getStorageSize,
} = useApp();

const useSize = async (name: string) => {
  const size = await getStorageSize(name);
  return transformBytes(size);
};

const appSizeMap = reactive<Map<string, string>>(new Map());

allCustomApps.value.forEach(async (item) => {
  const size = await useSize(item.name);
  appSizeMap.set(item.name, size);
});
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

.app-info {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .app-size {
    font-size: 12px;
    color: #999;
  }
}
</style>
