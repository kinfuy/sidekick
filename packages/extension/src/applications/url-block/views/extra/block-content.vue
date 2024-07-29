<template>
  <div
    v-if="isBlock"
    style="
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f4f4f4;
      border-radius: 4px;
      opacity: 0.9;
      color: #999;
      font-weight: 700;
    "
  >
    <div style="color: #999; cursor: pointer" @click="remove">查看</div>
  </div>
</template>

<script lang="ts" setup>
import type { Engine } from '@applications/url-block/store';
import { getStyle, setStyle } from '@utils';
import type { PropType } from 'vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  targetElement: {
    type: Object as PropType<HTMLElement>,
    required: true,
  },
  engin: {
    type: String as PropType<Engine>,
    required: true,
  },
});

const isBlock = ref(false);
const originPosition = ref({});

const remove = () => {
  setStyle(props.targetElement, {
    ...originPosition.value,
  });

  props.targetElement.removeAttribute('data-blocked');
  isBlock.value = false;
};

const init = () => {
  if (props.targetElement.getAttribute('data-blocked')) return;
  originPosition.value = {
    position: getStyle(props.targetElement, 'position'),
    height: getStyle(props.targetElement, 'height'),
    overflow: getStyle(props.targetElement, 'overflow'),
  };
  setStyle(props.targetElement, {
    position: 'relative',
    height: '40px',
    overflow: 'hidden',
  });
  props.targetElement.setAttribute('data-blocked', 'true');
  isBlock.value = true;
};

init();
</script>

<style lang="less" scoped></style>
