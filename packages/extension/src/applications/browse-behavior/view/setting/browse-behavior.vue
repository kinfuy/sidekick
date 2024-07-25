<template>
  <div class="browse-behavior">
    <div class="behavior-list">
      <div class="behavior-card">
        <div class="behavior-title">数据总览</div>
      </div>
      <div
        v-for="item in daysWebStatics"
        :key="item.date"
        class="behavior-card"
      >
        <div class="behavior-title">{{ item.date }}</div>
        <div class="behavior-content">
          <div v-for="web in item.webs" :key="web.url" class="behavior-item">
            <div>
              <span class="web-count">{{ web.count }}</span>
              <span>次</span>
            </div>
            <div class="web-info">
              <div class="web-url">{{ web.url }}</div>
              <div class="web-desc">{{ web.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBrowseBehaviorStore } from '@applications/browse-behavior/store';

const { daysWebStatics, dayUseTimes } = useBrowseBehaviorStore();

console.log(dayUseTimes.value);
</script>

<style lang="less" scoped>
.behavior-title {
  font-size: 16px;
  color: #333;
  font-weight: 700;
  margin-bottom: 12px;
}

.behavior-list {
  overflow-y: auto;
  height: calc(100vh - 200px);
}

.behavior-content {
  display: flex;
  flex-wrap: wrap;

  .behavior-item {
    height: 100px;
    width: 220px;
    border: 1px solid #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px #f4f4f4;
    margin-bottom: 10px;
    margin-right: 16px;
    padding: 16px 22px;

    .web-info {
      .web-url {
        font-size: 14px;
        color: #333;
        font-weight: 700;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .web-desc {
        font-size: 12px;
        color: #666;
        width: 180px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .web-count {
      font-size: 28px;
      font-weight: 700;
      color: var(--primary-color);
    }
  }
}
</style>
