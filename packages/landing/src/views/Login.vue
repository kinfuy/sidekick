<template>
  <div class="flex justify-center h-screen w-screen dev-tester-login">
    <Card
      class="w-4/12 min-w-[480px] max-w-[620px] mt-32 h-1/3 max-h-[580px] min-h-[360px]"
    >
      <CardHeader class="display justify-center items-center">
        <CardTitle class="text-center">
          <div class="flex items-center gap-2">
            <img src="/logo.png" width="68" height="68" />
            <span class="text-3xl font-bold"> DevTester</span>
          </div>
        </CardTitle>
      </CardHeader>
      <form>
        <CardContent class="grid grid-cols-1 gap-4">
          <div>
            <Input
              v-if="viewType !== 'confirm'"
              id="email"
              v-model="model.email"
              placeholder="输入你的邮箱"
              @blur="() => checkForm('email')"
            />
            <span v-if="viewType === 'confirm'">{{ model.email }}</span>
          </div>
          <div v-if="viewType !== 'login'" class="grid grid-cols-4 gap-4">
            <Input
              id="username"
              v-model="model.code"
              class="col-span-3"
              type="password"
              placeholder="输入验证码"
              @blur="() => checkForm('code')"
            />
            <Button class="bg-gray-400" @click="sendCode">
              {{ count === 60 ? '获取验证码' : `${count}s` }}</Button
            >
          </div>
          <div v-if="viewType !== 'confirm'">
            <Input
              id="username"
              v-model="model.password"
              type="password"
              placeholder="输入你的密码"
              autocomplete="off"
              @blur="() => checkForm('password')"
            />
          </div>
          <div v-if="viewType === 'register'">
            <Input
              id="username"
              v-model="model.repassword"
              type="password"
              autocomplete="off"
              placeholder="再次输入你的密码"
              @blur="() => checkForm('repassword')"
            />
          </div>
          <div v-if="errorTips" class="text-sm text-red-500 col-span-1">
            {{ errorTips }}
          </div>
        </CardContent>
      </form>

      <CardFooter>
        <div class="w-full">
          <Button class="w-full" @click="handleLogin">{{ btnText }}</Button>
          <div
            class="w-full text-left text-sm space-y-2 text-gray-500 pt-4 cursor-pointer"
          >
            {{ descText }}
          </div>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { md5 } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  loginApi,
  registerApi,
  sendCodeApi,
  verifyEmailApi,
} from '@/apis/user';
import { useAuth } from '@/store/useAuth';

const { setUser } = useAuth();

const router = useRouter();
const viewType = ref('login'); // login confirm resgister

const model = ref({
  password: '',
  code: '',
  email: '',
  name: '',
  repassword: '',
});
const errorTips = ref('');
const checkForm = (
  type: 'all' | 'email' | 'password' | 'repassword' | 'code',
) => {
  if (viewType.value === 'login') {
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
  if (viewType.value === 'register') {
    if (!model.value.email) {
      if (type === 'all' || type === 'email') errorTips.value = '请输入邮箱';
      return false;
    }
    if (!model.value.code) {
      if (type === 'all' || type === 'code') errorTips.value = '请输入验证码';
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
  if (viewType.value === 'confirm') {
    if (!model.value.email) {
      if (type === 'all' || type === 'email') errorTips.value = '请输入邮箱';
      return false;
    }
    if (!model.value.code) {
      if (type === 'all' || type === 'code') errorTips.value = '请输入验证码';
    }
  }
  errorTips.value = '';
  return true;
};

const createQuery = () => {
  if (viewType.value === 'login') {
    return {
      email: model.value.email,
      password: md5(model.value.password + model.value.email),
    };
  }
  if (viewType.value === 'register') {
    return {
      email: model.value.email,
      password: md5(model.value.password + model.value.email),
      verifyCode: model.value.code,
    };
  }
  if (viewType.value === 'confirm') {
    return {
      email: model.value.email,
      password: md5(model.value.password + model.value.email),
      verifyCode: model.value.code,
    };
  }

  return {};
};

const login = async () => {
  const check = checkForm('all');
  if (!check) return;
  const query = createQuery();
  const user = await loginApi<any>(query).catch((err) => {
    errorTips.value = err.message || '登录失败';
  });
  if (user) {
    if (user.confirm) {
      viewType.value = 'confirm';
      return;
    }
    setUser({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      email: model.value.email,
      avatar: user.avatar,
      name: user.name,
      description: user.description,
      subscription: user.subscription,
    });
    router.push({
      name: 'home',
    });
  }
};
const register = async () => {
  const check = checkForm('all');
  if (!check) return;
  const query = createQuery();
  const user = await registerApi<any>(query).catch((err) => {
    errorTips.value = err.message || '注册失败';
  });

  if (user) {
    setUser({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      email: model.value.email,
      avatar: user.avatar,
      name: user.name,
      description: user.description,
    });
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
    count.value = 60;
    errorTips.value = err.message || '验证码发送失败';
  });
};

const verifyEmail = async () => {
  const check = checkForm('all');
  if (!check) return;
  const query = createQuery();
  const user = await verifyEmailApi<any>(query).catch((err) => {
    errorTips.value = err.message || '验证失败';
  });

  if (user) {
    setUser({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      email: model.value.email,
      avatar: user.avatar,
      name: user.name,
      description: user.description,
      subscription: user.subscription,
    });
  }
};

const handleLogin = () => {
  if (viewType.value === 'login') {
    login();
  }
  if (viewType.value === 'register') {
    register();
  }
  if (viewType.value === 'confirm') {
    verifyEmail();
  }
};

const btnText = computed(() => {
  if (viewType.value === 'login') return '登录/注册';
  if (viewType.value === 'register') return '重置密码';
  if (viewType.value === 'confirm') return '验证邮箱';
  return '';
});

const descText = computed(() => {
  if (viewType.value === 'login') return '忘记密码？';
  if (viewType.value === 'register') return '已有账号?';
  if (viewType.value === 'confirm') return '已有账号?';
  return '';
});
</script>

<style lang="less" scoped>
@keyframes gradient-bg {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.dev-tester-login {
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #d6dac8, #f3d0d7, #afd198, #f5cca0);
  background-size: 600% 600%;
  animation: gradient-bg 10s ease-in-out infinite;
}
</style>
