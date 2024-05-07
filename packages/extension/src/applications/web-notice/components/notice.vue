<template>
  <div
    class="web-notice-warper"
    :style="{
      'border-color': current?.style.color,
      'border-width': `${current?.style.borderWidth}px`,
    }"
  >
    <div
      v-if="current"
      class="notice-tips"
      :class="{ 'animation-none': current?.style.animation }"
      :style="{
        color: current?.style.color,
        fontSize: `${current?.style.fontSize}px`,
        backgroundImage: color,
      }"
    >
      {{ current.tips }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useWebNoticeStore } from '../store';

const { current } = useWebNoticeStore();

const color = computed(() => {
  return current.value?.style.animation
    ? `-webkit-linear-gradient(left,#fff,${current.value?.style.color} 25%,#fff 50%,${current.value?.style.color} 75%,#fff)`
    : '';
});
</script>

<style lang="less" scoped shadow="webnotice">
.web-notice-warper {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2147483600;
  border: 4px solid red;
  box-sizing: border-box;
  pointer-events: none;

  .notice-tips {
    position: absolute;
    left: 50%;
    top: 4px;
    color: red;
    font-size: 16px;
    transform: translate(-50%, 0);
  }

  .animation-none {
    -webkit-text-fill-color: transparent;
    /* stylelint-disable */
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 100%;
    animation: masked-animation 4s infinite linear;
  }
}

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
