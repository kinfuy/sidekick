<template>
  <div class="dev-tester">
    <header class="bg-white text-zinc-900">
      <div
        class="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16"
      >
        <div>
          <div class="flex items-center cursor-pointer" @click="handleHome">
            <div class="mr-2">
              <img
                loading="lazy"
                width="30"
                height="30"
                decoding="async"
                data-nimg="1"
                style="color: transparent"
                src="/logo.png"
              />
            </div>
            <div class="text-xl __className_3ac6c1">DevTester</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="text-sm px-3 py-1 rounded cursor-pointer"
            @click="handlePersonal"
          >
            个人中心
          </div>
        </div>
      </div>
    </header>
    <section class="bg-white text-zinc-900 py-8 sm:py-16">
      <div class="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div class="mb-8 md:mb-12">
          <h2 class="max-w-xl text-center mx-auto text-5xl font-bold mb-4">
            订阅
          </h2>
          <p
            class="max-w-screen-sm text-center text-base mx-auto text-zinc-500 mb-8"
          >
            更多精彩，更多惊喜，订阅 DevTester
          </p>
        </div>
        <div
          class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-6 items-center"
        >
          <div
            class="bg-white rounded-lg p-2 border border-solid border-zinc-100 md:data-[primary=true]:-mx-4 md:data-[primary=true]:z-[100] shadow-xl"
          >
            <div
              class="bg-zinc-100 rounded-md p-6 text-blue-900 from-blue-400 to-blue-600 data-[primary=true]:bg-gradient-to-bl data-[primary=true]:text-white data-[primary=true]:py-10"
            >
              <h3 class="text-sm font-medium mb-1">Free</h3>
              <div class="flex items-end">
                <span class="text-3xl font-bold leading-none">¥ 0</span>
              </div>
              <div class="mt-6">
                <a
                  target="_blank"
                  href="https://chromewebstore.google.com/detail/devtester/lgdplgdlaacpegfninnaekfcpajmafga?hl=en&authuser=0"
                  class="flex justify-center items-center h-10 text-sm font-medium rounded text-blue-900 text-center w-full bg-white active:scale-95 transition-transform"
                >
                  免费下载
                </a>
              </div>
            </div>
            <ul class="flex flex-col gap-4 p-6 py-6">
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>基础插件免费使用</p>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-lg p-2 border border-solid border-zinc-100 md:data-[primary=true]:-mx-4 md:data-[primary=true]:z-[100] shadow-xl"
            data-primary="true"
          >
            <div
              class="bg-zinc-100 rounded-md p-6 text-blue-900 from-blue-400 to-blue-600 data-[primary=true]:bg-gradient-to-bl data-[primary=true]:text-white data-[primary=true]:py-10"
              data-primary="true"
            >
              <h3 class="text-sm font-medium mb-1">季度会员 （早鸟优惠）</h3>
              <div class="flex items-end">
                <span class="text-3xl font-bold leading-none">¥ 8.88</span
                ><span class="opacity-50 text-xs ml-2 select-none leading-5"
                  >/ 季</span
                >
              </div>
              <div class="mt-6">
                <a
                  target="_blank"
                  :href="`https://afdian.net/order/create?plan_id=2814cdde240211efb3a552540025c377&product_type=0&month=1&remark=${remark}`"
                  class="flex justify-center items-center h-10 text-sm font-medium rounded text-blue-900 text-center w-full bg-white active:scale-95 transition-transform"
                >
                  订阅
                </a>
              </div>
            </div>
            <ul class="flex flex-col gap-4 p-6 py-6">
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>基础插件免费使用</p>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>解锁多端同步</p>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>解锁插件高阶功能</p>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>自定义 webhook</p>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>会员专属反馈通道，需求优先考虑</p>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>更多精彩，更多惊喜</p>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-lg p-2 border border-solid border-zinc-100 md:data-[primary=true]:-mx-4 md:data-[primary=true]:z-[100] shadow-xl"
          >
            <div
              class="bg-zinc-100 rounded-md p-6 text-blue-900 from-blue-400 to-blue-600 data-[primary=true]:bg-gradient-to-bl data-[primary=true]:text-white data-[primary=true]:py-10"
            >
              <h3 class="text-sm font-medium mb-1">永久会员</h3>
              <div class="flex items-end">
                <span
                  class="text-3xl font-bold leading-none from-blue-400 to-blue-600 bg-gradient-to-br text-transparent bg-clip-text"
                  >¥ 38.88</span
                >
              </div>
              <div class="mt-6">
                <a
                  :href="`https://afdian.net/order/create?plan_id=1104ef4c240311efbfd252540025c377&month=1&product_type=0&remark=${remark}`"
                  target="_blank"
                  class="flex justify-center items-center h-10 text-sm font-medium rounded text-blue-900 text-center w-full bg-white active:scale-95 transition-transform"
                >
                  订阅
                </a>
              </div>
            </div>
            <ul class="flex flex-col gap-4 p-6 py-6">
              <li class="flex items-center gap-3">
                <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#3b67e4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <p>解锁所有会员功能</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-white text-zinc-900 py-8">
      <div
        class="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4"
      >
        <div class="text-sm text-zinc-500 text-center">
          © 2024 kinfuy. All Rights Reserved.
        </div>
      </div>
      <div
        class="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4 text-sm text-zinc-500 text-center"
      >
        <a
          target="_blank"
          rel="noopener external nofollow noreferrer"
          href="https://beian.miit.gov.cn"
        >
          黔 ICP 备 2023015336 号 - 1
        </a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const remark = '请勿修改此备注，否则会影响订阅功能。';

const router = useRouter();

const handlePersonal = () => {
  router.push({
    name: 'personal',
  });
};

const handleHome = () => {
  router.push({
    name: 'home',
  });
};
</script>

<style lang="less" scoped></style>
