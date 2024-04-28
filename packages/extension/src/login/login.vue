<template>
  <div class="sidekick-login" :class="[theme]">
    <div class="sidekick-content">
      <div class="sidekick-login-logo">
        <div class="logo-content">
          <img :src="logoIcon" alt="logo" />
          <span class="logo-title">SildKick</span>
        </div>
      </div>
      <div class="login-content">
        <Sinput
          v-if="mode !== 'confirm'"
          v-model="model.email"
          class="login-form-item"
          placeholder="请输入邮箱"
        />
        <span v-if="mode === 'confirm'">{{ model.email }}</span>
        <div
          v-if="mode === 'register' || mode === 'confirm'"
          class="login-verify"
        >
          <Sinput
            v-model="model.verifyCode"
            placeholder="请输入邮箱收到的验证码"
          />
          <div class="login-verify-code btn-border" @click="sendCode">
            {{ count === 60 ? '获取' : `${count}s` }}
          </div>
        </div>
        <Sinput
          v-if="mode !== 'confirm'"
          v-model="model.password"
          class="login-form-item"
          type="password"
          placeholder="请输入密码"
        />
        <Sinput
          v-if="mode === 'register'"
          v-model="model.repassword"
          class="login-form-item"
          type="password"
          placeholder="请再次输入密码"
        />
      </div>
      <div v-if="errorTips" class="login-error">{{ errorTips }}</div>
      <div class="login-operate">
        <div class="btn btn-border btn-block btn-primary" @click="login">
          {{ btnText }}
        </div>
        <div class="login-oprate-footer">
          <div
            class="btn-text"
            @click="mode = mode === 'login' ? 'register' : 'login'"
          >
            {{ descText }}
          </div>
        </div>
      </div>
      <!-- <div v-if="mode === 'login'" class="login-line">第三方登录</div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTheme } from '@store/useTheme';
import logo from '@/assets/logo.png';
import { loginApi, sendCodeApi } from '@/apis/user';
import Sinput from '@/components/common/Input';
const logoIcon = chrome.runtime.getURL(logo);

const mode = ref('login');

const { theme } = useTheme();

const errorTips = ref('');

const model = ref({
  email: '',
  password: '',
  repassword: '',
  verifyCode: '',
});

const btnText = computed(() => {
  if (mode.value === 'login') return '登录/注册';
  if (mode.value === 'register') return '重置密码';
  if (mode.value === 'confirm') return '验证邮箱';
  return '';
});

const descText = computed(() => {
  if (mode.value === 'login') return '忘记密码？';
  if (mode.value === 'register') return '已有账号?';
  if (mode.value === 'confirm') return '已有账号?';
  return '';
});

const login = () => {
  loginApi({
    email: model.value.email,
    password: model.value.password,
  });
};

const count = ref(60);

const sendCode = () => {
  if (count.value < 60) return;
  count.value = 60;
  const timer = setInterval(() => {
    count.value--;
    if (count.value === 0) {
      count.value = 60;
      clearInterval(timer);
    }
  }, 1000);

  sendCodeApi({
    email: model.value.email,
  }).catch((err) => {
    console.log(err);
    clearInterval(timer);
  });
};
</script>
