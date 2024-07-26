<template>
  <div class="browse-behavior">
    <div class="behavior-list">
      <div class="behavior-card">
        <div class="behavior-title">数据总览</div>
      </div>
      <div v-for="item in daysUseTimes" :key="item.date" class="behavior-card">
        <div class="behavior-title">{{ item.date }}</div>
        <div class="behavior-content">
          <div v-for="web in item.webs" :key="web.url" class="behavior-item">
            <div class="web-detail">
              <div class="web-time">
                {{ transformSecond(web.useTimes || 1).val }}
                <span>{{ transformSecond(web.useTimes || 1).unit }}</span>
              </div>

              <div class="web-count">
                <span>打开:</span>
                {{ getCount(item.date, web.url) || 1 }}
                <span>次</span>
              </div>
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
import { transformSecond } from '@/utils/transform';

const { daysWebStatics, daysUseTimes } = useBrowseBehaviorStore();

const getCount = (date: string, url: string) => {
  let count = 0;
  daysWebStatics.value?.forEach((item) => {
    if (item.date === date) {
      item.webs?.forEach((web) => {
        if (web.url === url) {
          count = web.count;
        }
      });
    }
  });
  return count;
};
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
    width: 200px;
    height: 120px;
    border: 1px solid #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px #efe8e8;
    padding: 4px 6px;
    margin-right: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;

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

    .web-detail {
      .web-count {
        color: #999;
      }

      .web-time {
        font-size: 28px;
        font-weight: 700;
        color: var(--primary-color);
      }
    }
  }
}
</style>
