<template>
  <div class="click-count">
    <div class="popup-header">
      <div class="popup-header-title">点击计数器</div>
    </div>
    <div class="click-count-content">
      <div class="count-value">
        <span>Count:</span>
        <span class="click-value">{{ count }}</span>
      </div>
      <div>
        <ElButton v-if="status === 0" size="small" @click="() => handleStart()">
          开始
        </ElButton>
        <ElButton v-if="status === 1" size="small" @click="() => set(2)">
          暂停
        </ElButton>
        <ElButton
          v-if="status === 1 || status === 2"
          size="small"
          @click="() => handleStop()"
        >
          结束
        </ElButton>
        <ElButton v-if="status === 3" size="small" @click="() => set(0)">
          重置
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClickCountStore } from '@applications/click-count/store';
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import { sendMessageToContentScript } from '@utils';

const { status, count, set } = useClickCountStore();

const handleStart = () => {
  set(1);
  sendMessageToContentScript({
    from: 'popup',
    code: 'ClickCount',
    data: { key: 'init-click' },
  });
};

const handleStop = () => {
  set(3);
  sendMessageToContentScript({
    from: 'popup',
    code: 'ClickCount',
    data: { key: 'stop-click' },
  });
};
</script>

<style lang="less" scoped>
.click-count {
  padding: 10px;
}

.click-count-content {
  .click-value {
    text-align: center;
    width: 100%;

    .click-value {
      color: #409eff;
      font-size: 20px;
    }
  }
}
</style>
