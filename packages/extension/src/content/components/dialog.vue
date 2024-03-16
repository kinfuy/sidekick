<template>
  <div v-if="stateVisable" :style="style" class="sidekick-dialog">
    <div class="sidekick-dialog-header">
      <span>{{ title }}</span>
      <svg
        class="sidekick-dialog-close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        @click="close"
      >
        <path
          fill="currentColor"
          d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        ></path>
      </svg>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  width: {
    type: Number,
    default: 836,
  },
  height: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits(['update:modelValue']);

const stateVisable = ref(false);

const style = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };
});

watch(
  () => props.modelValue,
  (val) => {
    stateVisable.value = val;
  }
);

const show = () => {
  stateVisable.value = true;
};

const close = () => {
  stateVisable.value = false;
  emit('update:modelValue', false);
};
</script>

<style lang="less" shadow>
.sidekick-dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2999999999999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 8px;

  .sidekick-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 16px;
    height: 48px;

    .sidekick-dialog-close {
      width: 20px;
      height: 20px;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
