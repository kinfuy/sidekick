<template>
  <div class="user-setting">
    <div class="user-setting-content">
      <div class="user-info">
        <span v-if="!isLogin" class="user-login btn-text" @click="login"
          >未登录</span
        >
        <template v-else>
          <div>
            <span>{{ user?.email }}</span>
            <span v-if="vip?.name" class="vip-tag">{{ vip?.name }}</span>
          </div>
          <div v-if="vip?.endTime" class="vip-time">
            <span class="m-r-1">有效期：</span>
            <span>{{ formatTime(vip.endTime) }}</span>
          </div>
        </template>
      </div>
      <div class="user-operate">
        <div v-if="isLogin" class="btn-text" @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@store/useAuth';
import { sendMessageToExtension } from '@utils';
import dayjs from 'dayjs';

const formatTime = (str: string) => {
  return dayjs(str).format('YYYY-MM-DD');
};

const { user, vip, clearAuth, isLogin } = useAuth();

const logout = () => {
  clearAuth();
};

const login = () => {
  sendMessageToExtension({
    from: 'content',
    code: 'onOpenWindow',
    data: {
      openUrl: 'login.html',
      extra: {
        focused: true,
        width: 500,
        height: 680,
        left: 400,
        top: 100,
        type: 'panel',
      },
    },
  });
};
</script>

<style lang="less" scoped>
.user-setting-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.user-info {
  width: 100%;
}

.user-login {
  display: block;
}

.user-operate {
  width: 80px;
  flex-shrink: 1;
}

.vip-time {
  color: #999;
  font-size: 12px;
}
</style>
