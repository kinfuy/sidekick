<template>
  <div class="sidekick-login">
    <div class="sidekick-login-logo">
      <img :src="logoIcon" alt="logo" />
      <div class="theme-text-desc">发现更好玩的浏览器</div>
    </div>
    <div class="login-content">
      <Sinput
        v-model="model.email"
        class="login-form-item"
        placeholder="请输入邮箱"
      />
      <Sinput
        v-model="model.password"
        class="login-form-item m-t-1"
        type="password"
        placeholder="请输入密码"
      />
      <div v-if="mode === 'register'" class="login-verify m-t-1">
        <Sinput
          v-model="model.password"
          class="login-form-item"
          placeholder="请输入验证码"
        />
        <div class="login-verify-code btn-border" @click="sendCode">
          {{ count === 60 ? '获取' : `${count}s` }}
        </div>
      </div>
    </div>
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
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import logo from '@/assets/logo.png';
import { loginApi, sendCodeApi } from '@/apis/user';
import Sinput from '@/components/common/Input';
const logoIcon = chrome.runtime.getURL(logo);

const mode = ref('login');

const model = ref({
  email: '',
  password: '',
});

const btnText = computed(() => {
  return mode.value === 'login' ? '登录' : '注册';
});

const descText = computed(() => {
  return mode.value === 'login' ? '立即注册' : '已有账号?';
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
  debugger;

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
