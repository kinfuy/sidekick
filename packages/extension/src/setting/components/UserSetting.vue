<template>
  <div class="user-setting">
    <div class="user-setting-content">
      <div class="user-info">
        <span v-if="!isLogin" class="user-login btn-text" @click="login">
          未登录
        </span>
        <template v-else>
          <div>
            <span>{{ user?.email }}</span>
            <span
              v-if="subscription?.name"
              class="vip-tag"
              :class="{ 'vip-expire': !subscription?.isEffective }"
            >
              {{ subscription?.name }}
            </span>
          </div>
          <div v-if="subscription?.endTime" class="subscription-time">
            <span class="subscription-expire">
              <span class="subscription-expire-text">
                {{ subscription?.isEffective ? '有效期' : '过期于' }}：
              </span>
            </span>
            <span class="subscription-expire-text">
              {{ formatTime(subscription.endTime) }}
            </span>
          </div>
        </template>
      </div>
      <div class="user-operate">
        <div v-if="isLogin" class="btn-text" @click="logout">退出</div>
      </div>
    </div>
    <div
      v-if="(!subscription || !subscription.isEffective) && isLogin"
      class="user-setting-content m-t-2"
    >
      <Sinput
        v-model="activateCode"
        class="user-setting-code"
        placeholder="输入激活码激活会员"
      />
      <div class="btn-text" @click="handleActivate">激活</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { activationVipApi } from '@apis/user';
import type { Subscription } from '@store/useAuth';
import { useAuth } from '@store/useAuth';
import { sendMessageToExtension } from '@utils';
import dayjs from 'dayjs';
import { ElButton, ElMessage } from 'element-plus';
import { star } from '@utils/fire';
import { Message } from '@core/message';
import Sinput from '@/components/common/Input';

const formatTime = (str: string) => {
  return dayjs(str).format('YYYY-MM-DD');
};

const { user, subscription, clearAuth, isLogin, setSubscription } = useAuth();

const activateCode = ref('');

const logout = () => {
  clearAuth();
};

const login = () => {
  sendMessageToExtension({
    from: 'content',
    code: 'onOpenWindow',
    to: Message.Target.SERVERWORKER,
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

const handleActivate = async () => {
  if (!isLogin.value || !activateCode.value) return;
  const res = await activationVipApi<Subscription>({
    email: user.value!.email,
    code: activateCode.value,
  }).catch((err) => {
    activateCode.value = '';
    ElMessage.error(err.message);
  });
  if (res) {
    setSubscription(res);
    star();
    activateCode.value = '';
    ElMessage.success('激活成功');
  }
};
</script>

<style lang="less" scoped>
.user-setting-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--bg-color-second);
}

.user-info {
  width: 100%;
}

.user-login {
  display: block;
}

.user-operate {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  min-width: 40px;
  flex-shrink: 1;

  .btn-text {
    white-space: nowrap;
    margin-left: 8px;
  }
}

.subscription-time {
  color: #999;
  font-size: 12px;
}

.vip-expire {
  background: #999;
}

.subscription-expire-text {
  color: #999;
}

.user-setting-code {
  width: calc(100% - 120px);
}
</style>
