<template>
  <div class="user-setting">
    <div class="user-info">
      <span v-if="!isLogin" class="user-login btn-text" @click="login"
        >未登录</span
      >
      <template v-else>
        <span>{{ user?.email }}</span>
        <span v-if="vip?.name" class="vip-tag">{{ vip?.name }}</span>
      </template>
    </div>
    <div class="user-operate">
      <div v-if="isLogin" class="btn-text" @click="logout">退出</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@store/useAuth';
import { sendMessageToExtension } from '@utils';

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
</style>
