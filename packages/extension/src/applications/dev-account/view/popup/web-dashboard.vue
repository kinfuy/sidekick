<template>
  <div class="web-dashboard">
    <ElScrollbar height="340px" class="web-list">
      <Empty v-if="activeWebs?.length === 0" text="">
        <ElLink type="primary">暂无数据，快去创建一个平台吧</ElLink>
      </Empty>
      <div v-else class="web-list">
        <div v-for="web in activeWebs" :key="web.name" class="web-item">
          <div class="web-info">
            <ElLink @click="() => handleEnv(web.envs[0])">{{
              web.name
            }}</ElLink>
            <ElButton
              type="primary"
              :plain="true"
              size="small"
              @click="setMatchWeb(web.name)"
            >
              用户
            </ElButton>
          </div>
          <div v-if="web.envs.length > 1" class="env-tags">
            <span
              v-for="env in web.envs"
              :key="env.name"
              class="env-tag"
              @click="() => handleEnv(env)"
            >
              {{ env.name }}
            </span>
          </div>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import type { WebEnv } from '@applications/dev-account/store';
import { useDevAccountStore } from '@applications/dev-account/store';
import { ElButton, ElLink, ElScrollbar } from 'element-plus';
import Empty from '@/components/common/Empty/Empty';
const emit = defineEmits(['setMatch']);

const { activeWebs } = useDevAccountStore();
const setMatchWeb = (name: string) => {
  emit('setMatch', name);
};

const handleEnv = (web: WebEnv) => {
  window.open(`http://${web.url}`, '_blank');
};
</script>

<style lang="less" scoped>
.web-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #f3f3f3;

  .web-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .env-tags {
    margin-top: 10px;

    .env-tag {
      display: inline-block;
      margin-right: 8px;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      background-color: #f3f3f3;
      cursor: pointer;

      &:hover {
        background-color: var(--primary-color-tint-60);
      }
    }
  }
}
</style>
