<template>
  <div class="url-block">
    <div class="popup-header">
      <div class="popup-header-title">屏蔽内容农场</div>
    </div>
    <ElScrollbar height="340px" class="web-list">
      <div class="url-block-content">
        <div v-for="item in blackList" :key="item.title" class="url-block-item">
          <div>
            <div>{{ item.title }}</div>
            <div style="color: #999">{{ item.value }}</div>
          </div>
          <ElSwitch v-model="item.enable" size="small" />
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useUrlBlockStore } from '@applications/url-block/store';
import { ElScrollbar, ElSwitch } from 'element-plus';

const { blackList } = useUrlBlockStore();
</script>

<style lang="less" scoped>
.url-block {
  padding: 10px;
  .url-block-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #f3f3f3;
  }
}
</style>
