<template>
  <div v-if="stateVisable" :class="`sidekick-dialog sidekick-${direction}`">
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
  direction: {
    type: String,
    default: 'left',
  },
  title: {
    type: String,
  },
});

const emit = defineEmits(['update:modelValue']);

const stateVisable = ref(false);

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
