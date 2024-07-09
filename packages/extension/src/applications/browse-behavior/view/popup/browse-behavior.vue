<template>
  <div class="browse-behavior">
    <div class="browse-behavior-header">
      <div class="browse-behavior-title">Browse Behavior</div>
    </div>
    <div class="behavior-title">今日访问数据</div>
    <div v-if="todayWebStatics" class="behavior-list">
      <div
        v-for="web in todayWebStatics.webs"
        :key="web.url"
        class="behavior-item"
      >
        <div class="web-info">
          <div class="web-url">{{ web.url }}</div>
        </div>
        <div>
          <span class="web-count">{{ web.count }}</span>
          <span>次</span>
        </div>
      </div>
    </div>
    <ElLoading v-else />
  </div>
</template>

<script lang="ts" setup>
import type { DayOpenWebs } from '@applications/browse-behavior/store';
import { useBrowseBehaviorStore } from '@applications/browse-behavior/store';
import { onActivated, ref, watch } from 'vue';
import { ElLoading } from 'element-plus';
import dayjs from 'dayjs';

const { queryByDate, inited } = useBrowseBehaviorStore();

const todayWebStatics = ref<DayOpenWebs>();

const isReady = ref(false);
const init = () => {
  const date = dayjs().format('YYYY-MM-DD');
  const day = queryByDate(date);
  if (day) todayWebStatics.value = day;
  isReady.value = true;
  console.log(day);
};

watch(
  () => inited.value,
  () => {
    if (inited.value) {
      init();
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
.browse-behavior {
  overflow: hidden;
}

.browse-behavior-header {
  padding: 10px;
  height: 28px;

  .browse-behavior-title {
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
}

.behavior-title {
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #333;
}

.behavior-list {
  height: 300px;
  overflow-y: auto;
  padding: 10px;

  .behavior-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .web-count {
      font-size: 16px;
      font-weight: 700;
      color: var(--primary-color);
    }
  }
}
</style>
