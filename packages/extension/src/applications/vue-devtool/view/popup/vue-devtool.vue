<template>
  <div class="vue-devtool">
    <div class="vue-devtool-header">
      <div class="vue-devtool-title">Vue Devtool</div>
    </div>
    <div class="flex justify-between align-center">
      <span>状态</span>
      <ElSwitch
        :model-value="isAppActive('VueDevtool')"
        @change="(value) => updateAppState('VueDevtool', value as boolean)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElSwitch } from 'element-plus';
import { useApp } from '@/store/useApp';
const { isAppActive, updateAppState } = useApp();
</script>

<style lang="less" scoped>
.vue-devtool {
  padding: 10px;
}

.vue-devtool-header {
  height: 28px;

  .vue-devtool-title {
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
}
</style>
