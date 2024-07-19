<template>
  <div class="user-dashboard">
    <Empty v-if="!matchWeb?.users?.length" />
    <ElScrollbar v-else height="340px" class="user-list">
      <div class="user-list">
        <div
          v-for="user in matchWeb?.users"
          :key="user.name"
          class="user-item"
          @click="() => handleLogin(matchWeb, user)"
        >
          <div class="user-info">
            <span v-if="user.role" class="user-role">({{ user.role }})</span>
            <span>{{ user.name }}</span>
          </div>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ElScrollbar } from 'element-plus';
import { useDevAccountStore } from '@applications/dev-account/store';
import { sendMessageToContentScript } from '@utils';
import { Message } from '@core/message';
import Empty from '@/components/common/Empty/Empty';

const { matchWeb } = useDevAccountStore();

const handleLogin = (web: any, user: any) => {
  sendMessageToContentScript({
    code: 'DevAccount',
    from: Message.Form.POPUP_MESSAGE,
    to: Message.Target.CONTENT,
    data: {
      key: 'user-login',
      data: {
        web,
        user,
      },
    },
  });
  window.close();
};
</script>

<style lang="less" scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;

  .user-item {
    margin-right: 10px;

    .user-info {
      display: inline-block;
      padding: 4px 8px;
      margin-bottom: 10px;
      border-radius: 4px;
      background-color: #f4f4f4;
      cursor: pointer;
      color: #999;

      &:hover {
        background-color: var(--primary-color-tint-80);
      }
    }

    .user-role {
      margin-right: 8px;
      font-size: 14px;
      color: var(--primary-color);
    }
  }
}
</style>
