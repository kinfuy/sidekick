<template>
  <header class="bg-white text-zinc-900">
    <div
      class="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16"
    >
      <div>
        <div class="select-none flex items-center">
          <div class="mr-2">
            <img
              alt="Tailsc Logo"
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
          class="bg-blue-500 text-white hover:bg-blue-600 text-sm accent-blue px-3 py-1 rounded cursor-pointer"
          @click="handleSubscribe"
        >
          订阅会员
        </div>
        <div
          class="text-sm px-3 py-1 rounded cursor-pointer"
          @click="handlePersonal"
        >
          个人中心
        </div>
      </div>
    </div>
  </header>
  <section class="py-16 md:py-24 bg-white overflow-x-clip">
    <div
      class="relative max-w-screen-xl w-full mx-auto px-4 before:absolute before:w-full before:max-w-md before:h-40 before:pointer-events-none before:bg-gradient-to-br before:from-yellow-200 before:to-orange-300 before:blur-[100px] before:left-0 before:-translate-x-1/4 before:top-0 before:translate-y-1/2 after:absolute after:w-full after:max-w-md after:h-20 after:pointer-events-none after:bg-gradient-to-br after:from-amber-300 after:to-yellow-200 after:blur-[100px] after:left-0 md:after:translate-x-1/2 after:top-0 after:translate-y-1/2"
    >
      <div
        class="w-full flex flex-col md:flex-row gap-8 items-center z-10 relative"
      >
        <div class="flex-1 min-w-0">
          <h1 class="text-5xl md:text-6xl font-bold mb-4">
            专注于开发测试的浏览器工具集
          </h1>
          <p
            class="text-lg md:text-xl text-zinc-700 w-full md:w-5/6 leading-8 mb-8"
          >
            Browser toolset focused on development and testing
          </p>
          <div class="flex flex-col sm:flex-row gap-3 items-center">
            <a
              target="_blank"
              href="https://chromewebstore.google.com/detail/devtester/lgdplgdlaacpegfninnaekfcpajmafga?hl=en&authuser=0"
              class="bg-blue-400 hover:bg-blue-600 text-white flex items-center justify-center gap-2 h-12 px-6 rounded cursor-pointer w-full sm:w-auto"
            >
              <div class="w-6 h-6">
                <svg
                  t="1718775857708"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4303"
                  width="100%"
                  height="100%"
                >
                  <path
                    d="M123.648 178.346667C361.642667-98.602667 802.986667-43.946667 967.936 279.68h-396.501333c-71.424 0-117.546667-1.621333-167.509334 24.661333-58.709333 30.933333-102.997333 88.234667-118.485333 155.52L123.648 178.389333z"
                    fill="#EA4335"
                    p-id="4304"
                  ></path>
                  <path
                    d="M341.674667 512c0 93.866667 76.330667 170.24 170.154666 170.24 93.866667 0 170.154667-76.373333 170.154667-170.24s-76.330667-170.24-170.154667-170.24c-93.866667 0-170.154667 76.373333-170.154666 170.24z"
                    fill="#4285F4"
                    p-id="4305"
                  ></path>
                  <path
                    d="M577.877333 734.848c-95.530667 28.373333-207.274667-3.114667-268.501333-108.8-46.762667-80.64-170.24-295.765333-226.346667-393.557333-196.565333 301.226667-27.136 711.808 329.685334 781.866666l165.12-279.509333z"
                    fill="#34A853"
                    p-id="4306"
                  ></path>
                  <path
                    d="M669.866667 341.76a233.130667 233.130667 0 0 1 43.008 286.634667c-40.576 69.973333-170.154667 288.682667-232.96 394.581333 367.658667 22.656 635.733333-337.664 514.645333-681.258667H669.866667z"
                    fill="#FBBC05"
                    p-id="4307"
                  ></path>
                </svg>
              </div>
              <div>Download</div>
            </a>
          </div>
        </div>
        <div class="flex-1 min-w-0 hidden md:block">
          <img
            alt="Astronaut in the air"
            loading="lazy"
            width="520"
            height="424"
            decoding="async"
            data-nimg="1"
            src="/cover.svg"
            class="object-contain mx-auto"
            style="color: transparent"
          />
        </div>
      </div>
    </div>
  </section>
  <section class="py-8 sm:py-16 bg-white">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-16">
      <div class="mb-14 text-center">
        <h2
          class="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-2"
        >
          工具集
        </h2>
        <p
          class="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto"
        >
          一款为开发人员和测试人员量身打造的浏览器工具集，旨在提高开发与测试的效率，减少冗余操作和误操作的风险。通过集成一系列实用的功能，为用户提供了更加便捷、高效的工作体验。
        </p>
      </div>
      <div
        class="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8"
      >
        <div
          class="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4"
        >
          <div
            class="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-indigo-600"
          >
            <svg
              class="stroke-indigo-600 transition-all duration-500 group-hover:stroke-white"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 27.5L15 25M15 25V21.25M15 25L20 27.5M8.75 14.375L12.5998 11.0064C13.1943 10.4862 14.1163 10.6411 14.5083 11.327L15.4917 13.048C15.8837 13.7339 16.8057 13.8888 17.4002 13.3686L21.25 10M2.5 2.5H27.5M26.25 2.5V13.25C26.25 17.0212 26.25 18.9069 25.0784 20.0784C23.9069 21.25 22.0212 21.25 18.25 21.25H11.75C7.97876 21.25 6.09315 21.25 4.92157 20.0784C3.75 18.9069 3.75 17.0212 3.75 13.25V2.5"
                stroke=""
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <h4 class="text-lg font-medium text-gray-900 mb-3 capitalize">
            多平台开发账号管理工具
            <div class="text-sm font-normal text-gray-500">DevAccount</div>
          </h4>
          <p class="text-sm font-normal text-gray-500">
            极简多平台账号管理工具，一键切换账号，高效管理信息，快速适应生产、预发、测试、仿真环境。
          </p>
        </div>
        <div
          class="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4"
        >
          <div
            class="bg-pink-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-pink-600"
          >
            <svg
              class="stroke-pink-600 transition-all duration-500 group-hover:stroke-white"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 7.5C2.5 4.73858 4.73858 2.5 7.5 2.5C10.2614 2.5 12.5 4.73858 12.5 7.5C12.5 10.2614 10.2614 12.5 7.5 12.5C4.73858 12.5 2.5 10.2614 2.5 7.5Z"
                stroke=""
                stroke-width="2"
              ></path>
              <path
                d="M2.5 22.5C2.5 20.143 2.5 18.9645 3.23223 18.2322C3.96447 17.5 5.14298 17.5 7.5 17.5C9.85702 17.5 11.0355 17.5 11.7678 18.2322C12.5 18.9645 12.5 20.143 12.5 22.5C12.5 24.857 12.5 26.0355 11.7678 26.7678C11.0355 27.5 9.85702 27.5 7.5 27.5C5.14298 27.5 3.96447 27.5 3.23223 26.7678C2.5 26.0355 2.5 24.857 2.5 22.5Z"
                stroke=""
                stroke-width="2"
              ></path>
              <path
                d="M17.5 7.5C17.5 5.14298 17.5 3.96447 18.2322 3.23223C18.9645 2.5 20.143 2.5 22.5 2.5C24.857 2.5 26.0355 2.5 26.7678 3.23223C27.5 3.96447 27.5 5.14298 27.5 7.5C27.5 9.85702 27.5 11.0355 26.7678 11.7678C26.0355 12.5 24.857 12.5 22.5 12.5C20.143 12.5 18.9645 12.5 18.2322 11.7678C17.5 11.0355 17.5 9.85702 17.5 7.5Z"
                stroke=""
                stroke-width="2"
              ></path>
              <path
                d="M17.5 22.5C17.5 19.7386 19.7386 17.5 22.5 17.5C25.2614 17.5 27.5 19.7386 27.5 22.5C27.5 25.2614 25.2614 27.5 22.5 27.5C19.7386 27.5 17.5 25.2614 17.5 22.5Z"
                stroke=""
                stroke-width="2"
              ></path>
            </svg>
          </div>
          <h4 class="text-lg font-medium text-gray-900 mb-3 capitalize">
            生产环境提示
            <div class="text-sm font-normal text-gray-500">
              Prod Environment Tips
            </div>
          </h4>
          <p class="text-sm font-normal text-gray-500">
            新增生产环境提示功能，敏感操作即时提醒，避免误操作损失。
          </p>
        </div>
        <div
          class="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4"
        >
          <div
            class="bg-teal-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-teal-600"
          >
            <svg
              class="stroke-teal-600 transition-all duration-500 group-hover:stroke-white"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 26.25H26.25M6.25 22.875C4.86929 22.875 3.75 21.8676 3.75 20.625V12.75C3.75 11.5074 4.86929 10.5 6.25 10.5C7.63071 10.5 8.75 11.5074 8.75 12.75V20.625C8.75 21.8676 7.63071 22.875 6.25 22.875ZM15 22.875C13.6193 22.875 12.5 21.8676 12.5 20.625V9.375C12.5 8.13236 13.6193 7.125 15 7.125C16.3807 7.125 17.5 8.13236 17.5 9.375V20.625C17.5 21.8676 16.3807 22.875 15 22.875ZM23.75 22.875C22.3693 22.875 21.25 21.8676 21.25 20.625V6C21.25 4.75736 22.3693 3.75 23.75 3.75C25.1307 3.75 26.25 4.75736 26.25 6V20.625C26.25 21.8676 25.1307 22.875 23.75 22.875Z"
                stroke=""
                stroke-width="2"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <h4 class="text-lg font-medium text-gray-900 mb-3 capitalize">
            缓存助手
            <div class="text-sm font-normal text-gray-500">Cache Assistant</div>
          </h4>
          <p class="text-sm font-normal text-gray-500">
            支持查看站点storage详情，包括localStorage、sessionStorage、cookies，并允许清除、修改，助力调试测试。
          </p>
        </div>
        <div
          class="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4"
        >
          <div
            class="bg-orange-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-orange-600"
          >
            <svg
              class="stroke-orange-600 transition-all duration-500 group-hover:stroke-white"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4167 12.0833V21.25M5.41667 21.25V20.8333C5.41667 19.262 5.41667 18.4763 5.90482 17.9882C6.39298 17.5 7.17865 17.5 8.75 17.5H22.0833C23.6547 17.5 24.4404 17.5 24.9285 17.9882C25.4167 18.4763 25.4167 19.262 25.4167 20.8333V21.25M15.4167 9.16667C13.8453 9.16667 13.0596 9.16667 12.5715 8.67851C12.0833 8.19036 12.0833 7.40468 12.0833 5.83333C12.0833 4.26198 12.0833 3.47631 12.5715 2.98816C13.0596 2.5 13.8453 2.5 15.4167 2.5C16.988 2.5 17.7737 2.5 18.2618 2.98816C18.75 3.47631 18.75 4.26198 18.75 5.83333C18.75 7.40468 18.75 8.19036 18.2618 8.67851C17.7737 9.16667 16.988 9.16667 15.4167 9.16667ZM7.08333 25.8333C7.08333 26.7538 6.33714 27.5 5.41667 27.5C4.49619 27.5 3.75 26.7538 3.75 25.8333C3.75 24.9129 4.49619 24.1667 5.41667 24.1667C6.33714 24.1667 7.08333 24.9129 7.08333 25.8333ZM17.0833 25.8333C17.0833 26.7538 16.3371 27.5 15.4167 27.5C14.4962 27.5 13.75 26.7538 13.75 25.8333C13.75 24.9129 14.4962 24.1667 15.4167 24.1667C16.3371 24.1667 17.0833 24.9129 17.0833 25.8333ZM27.0833 25.8333C27.0833 26.7538 26.3371 27.5 25.4167 27.5C24.4962 27.5 23.75 26.7538 23.75 25.8333C23.75 24.9129 24.4962 24.1667 25.4167 24.1667C26.3371 24.1667 27.0833 24.9129 27.0833 25.8333Z"
                stroke=""
                stroke-width="2"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <h4 class="text-lg font-medium text-gray-900 mb-3 capitalize">
            超链直达
            <div class="text-sm font-normal text-gray-500">
              HyperLink Direct Access
            </div>
          </h4>
          <p class="text-sm font-normal text-gray-500">
            屏蔽了烦人的链接拦截确认，使用户能够一键直达目标页面，无需再面对繁琐的确认对话框，大大节省了用户的时间和精力。
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-white text-zinc-900 py-8 sm:py-16">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-16">
      <div class="mb-8">
        <h2
          class="max-w-screen-md mx-auto text-center text-2xl md:text-3xl mb-2 font-bold"
        >
          更多精彩功能，敬请期待
        </h2>
        <p
          class="max-w-screen-md mx-auto text-center text-base sm:text-lg text-zinc-400"
        >
          专注于开发与测试，但我们的视野远不止于此
        </p>
      </div>
    </div>
  </section>
  <footer class="bg-white text-zinc-900 py-8">
    <div class="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4">
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
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handlePersonal = () => {
  router.push({
    name: 'personal',
  });
};

const handleSubscribe = () => {
  router.push({
    name: 'subscribe',
  });
};
</script>

<style lang="less" scoped></style>
