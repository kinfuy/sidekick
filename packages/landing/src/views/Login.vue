<template>
  <div class="dev-tester-login"></div>
</template>

<script lang="ts" setup></script>

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
