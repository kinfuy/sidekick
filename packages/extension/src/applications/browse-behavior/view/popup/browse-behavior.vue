<template>
  <div class="browse-behavior">
    <div class="browse-behavior-header">
      <div class="browse-behavior-title">浏览数据</div>
    </div>
    <div class="behavior-title">今日访问数据</div>
    <div v-if="dayUseTimes" class="behavior-list">
      <div
        v-for="web in dayUseTimes?.webs"
        :key="web.url"
        class="behavior-item"
      >
        <div class="web-info">
          <ElImage
            v-if="web.favIconUrl"
            :src="web.favIconUrl"
            class="web-logo"
            alt="logo"
            width="16"
            height="16"
          >
            <template #error>
              <img
                class="web-logo"
                alt="logo"
                width="16"
                height="16"
                src="@/assets/image/no-found.svg"
              />
            </template>
          </ElImage>
          <div class="web-url">{{ web.url }}</div>
        </div>
        <div class="web-detail">
          <span class="web-count">
            <span class="web-tip">活跃</span>
            <span class="web-value">{{
              transformSecond(web.useTimes || 1).val
            }}</span>
            <span class="web-tip">{{
              transformSecond(web.useTimes || 1).unit
            }}</span>
          </span>
          <span v-if="getCount(web.url)" class="web-count">
            <span class="web-tip">打开</span>
            <span class="web-value">{{ getCount(web.url) }}</span>
            <span class="web-tip">次</span>
          </span>
        </div>
      </div>
    </div>
    <ElLoading v-else />
  </div>
</template>

<script lang="ts" setup>
import { useBrowseBehaviorStore } from '@applications/browse-behavior/store';
import { ElImage, ElLoading } from 'element-plus';
import { transformSecond } from '@/utils/transform';
const { dayWebCounts, dayUseTimes, curentActiveWeb } = useBrowseBehaviorStore();

const getCount = (url: string) => {
  let count = 0;
  dayWebCounts.value?.webs?.forEach((item) => {
    if (item.url === url) {
      count = item.count;
    }
  });
  return count;
};
</script>

<style lang="less" scoped>
.browse-behavior {
  overflow: hidden;
  width: 100%;
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
  padding: 4px;

  .behavior-item {
    margin-bottom: 10px;
    border: 1px solid #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px #f4f4f4;
    padding: 4px 6px;

    .web-info {
      width: 400px;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: 32px;

      .web-logo {
        margin-right: 8px;
        width: 20px;
        height: 20px;
      }

      .web-url {
        width: 100%;
        font-size: 14px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .web-title {
        display: inline-block;
        font-size: 12px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .web-detail {
      display: flex;
      font-size: 12px;

      .web-count {
        margin-right: 8px;

        .web-tip {
          color: #999;
          font-size: 12px;
          display: inline-block;
          transform: scale(0.85);
        }

        .web-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
