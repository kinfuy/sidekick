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
          @blur="() => checkForm('email')"
        />
        <span v-if="mode === 'confirm'">{{ model.email }}</span>
        <div
          v-if="mode === 'register' || mode === 'confirm'"
          class="login-verify"
        >
          <Sinput
            v-model="model.verifyCode"
            placeholder="请输入邮箱收到的验证码"
            @blur="() => checkForm('verifyCode')"
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
          @blur="() => checkForm('password')"
        />
        <Sinput
          v-if="mode === 'register'"
          v-model="model.repassword"
          class="login-form-item"
          type="password"
          placeholder="请再次输入密码"
          @blur="() => checkForm('repassword')"
        />
      </div>
      <div class="login-error">{{ errorTips ?? '' }}</div>
      <div class="login-operate">
        <div class="btn btn-border btn-block btn-primary" @click="btnAction">
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
import { computed, ref, watch } from 'vue';
import { useTheme } from '@store/useTheme';
import { md5 } from '@utils/base64';
import { clearActiveTab, getChromeUrl } from '@utils';
import type { UserInfo } from '@store/useAuth';
import { useAuth } from '@store/useAuth';
import logo from '@/assets/logo.png';
import {
  loginApi,
  registerApi,
  sendCodeApi,
  verifyEmailApi,
} from '@/apis/user';
import Sinput from '@/components/common/Input';
const logoIcon = chrome.runtime.getURL(logo);

const mode = ref('login');

const { theme } = useTheme();

const { setUser } = useAuth();

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

const checkForm = (
  type: 'all' | 'email' | 'password' | 'repassword' | 'verifyCode',
) => {
  if (mode.value === 'login') {
    if (!model.value.email) {
      if (type === 'all' || type === 'email') errorTips.value = '请输入邮箱';
      return false;
    }
    const regEmail =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!regEmail.test(model.value.email)) {
      if (type === 'all' || type === 'email')
        errorTips.value = '请输入正确的邮箱';
      return false;
    }
    if (!model.value.password) {
      if (type === 'all' || type === 'password') errorTips.value = '请输入密码';
      return false;
    }
  }
  if (mode.value === 'register') {
    if (!model.value.email) {
      if (type === 'all' || type === 'email') errorTips.value = '请输入邮箱';
      return false;
    }
    if (!model.value.verifyCode) {
      if (type === 'all' || type === 'verifyCode')
        errorTips.value = '请输入验证码';
      return false;
    }
    if (!model.value.password) {
      if (type === 'all' || type === 'password') errorTips.value = '请输入密码';
      return false;
    }
    if (!model.value.repassword) {
      if (type === 'all' || type === 'repassword')
        errorTips.value = '请再次输入密码';
      return false;
    }
    if (model.value.password !== model.value.repassword) {
      if (type === 'all' || type === 'repassword' || type === 'password')
        errorTips.value = '密码不一致';
      return false;
    }
  }
  if (mode.value === 'confirm') {
    if (!model.value.email) {
      if (type === 'all' || type === 'email') errorTips.value = '请输入邮箱';
      return false;
    }
    if (!model.value.verifyCode) {
      if (type === 'all' || type === 'verifyCode')
        errorTips.value = '请输入验证码';
    }
  }
  errorTips.value = '';
  return true;
};

const createQuery = () => {
  if (mode.value === 'login') {
    return {
      email: model.value.email,
      password: md5(model.value.password + model.value.email),
    };
  }
  if (mode.value === 'register') {
    return {
      email: model.value.email,
      password: md5(model.value.password + model.value.email),
      verifyCode: model.value.verifyCode,
    };
  }
  if (mode.value === 'confirm') {
    return {
      email: model.value.email,
      password: md5(model.value.password + model.value.email),
      verifyCode: model.value.verifyCode,
    };
  }

  return {};
};

const login = async () => {
  const check = checkForm('all');
  if (!check) return;
  const query = createQuery();
  const user = await loginApi<UserInfo & { confirm: boolean }>(query).catch(
    (err) => {
      errorTips.value = err.message || '登录失败';
    },
  );
  if (user) {
    if (user.confirm) {
      mode.value = 'confirm';
    } else {
      setUser({
        token: user.token,
        refreshToken: user.refreshToken,
        email: model.value.email,
        avatar: user.avatar,
        name: user.name,
        description: user.description,
        subscription: user.subscription,
      });
      clearActiveTab();
    }
  }
};

const register = async () => {
  const check = checkForm('all');
  if (!check) return;
  const query = createQuery();
  const user = await registerApi<UserInfo>(query).catch((err) => {
    errorTips.value = err.message || '注册失败';
  });

  if (user) {
    setUser({
      token: user.token,
      refreshToken: user.refreshToken,
      email: model.value.email,
      avatar: user.avatar,
      name: user.name,
      description: user.description,
    });
    clearActiveTab();
  }
};

const count = ref(60);

const sendCode = async () => {
  const check = checkForm('all');
  if (!check) return;
  if (count.value < 60) return;
  count.value = 60;
  const timer = setInterval(() => {
    count.value--;
    if (count.value === 0) {
      count.value = 60;
      clearInterval(timer);
    }
  }, 1000);

  await sendCodeApi({
    email: model.value.email,
  }).catch((err) => {
    clearInterval(timer);
    errorTips.value = err.message || '验证码发送失败';
  });
};

const verifyEmail = async () => {
  const check = checkForm('all');
  if (!check) return;
  const query = createQuery();
  const user = await verifyEmailApi<UserInfo>(query).catch((err) => {
    errorTips.value = err.message || '验证失败';
  });

  if (user) {
    setUser({
      token: user.token,
      refreshToken: user.refreshToken,
      email: model.value.email,
      avatar: user.avatar,
      name: user.name,
      description: user.description,
      subscription: user.subscription,
    });
    clearActiveTab();
  }
};

const btnAction = () => {
  if (mode.value === 'login') login();
  if (mode.value === 'register') register();
  if (mode.value === 'confirm') verifyEmail();
};
watch(
  () => mode.value,
  () => {
    errorTips.value = '';
  },
);
</script>
