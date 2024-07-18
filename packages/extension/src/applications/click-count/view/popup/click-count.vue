<template>
  <div class="click-count">
    <div class="popup-header">
      <div class="popup-header-title">点击计数器</div>
    </div>
    <div class="click-count-content">
      <div class="btn-group">
        <ElButton v-if="status === 0" size="small" @click="() => handleStart()">
          开始
        </ElButton>
        <ElButton v-if="status === 1" size="small" @click="() => set(2)">
          暂停
        </ElButton>
        <ElButton v-if="status === 2" size="small" @click="() => set(1)">
          继续
        </ElButton>
        <ElButton
          v-if="status === 1 || status === 2"
          size="small"
          @click="() => handleStop()"
        >
          结束
        </ElButton>
      </div>
      <div class="count-value">
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClickCountStore } from '@applications/click-count/store';
import { ElButton } from 'element-plus';
import { sendMessageToContentScript } from '@utils';
import { useApp } from '@store/useApp';

const { status, count, set } = useClickCountStore();
const { setPopupActive } = useApp();

const handleStart = () => {
  set(1);
  setPopupActive('ClickCount');
  sendMessageToContentScript({
    from: 'popup',
    code: 'ClickCount',
    data: { key: 'init-click' },
  });
  window.close();
};

const handleStop = () => {
  set(0);
  setPopupActive('');
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
  .count-value {
    text-align: center;
    width: 100%;
    color: var(--primary-color);
    font-size: 62px;
  }

  .btn-group {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
}
</style>
