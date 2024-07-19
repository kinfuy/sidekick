<template>
  <div class="click-count" :class="{ 'event-effect': canClick }">
    <div class="click-header">
      <div class="count-value">
        <span style="font-size: 24px"> {{ count }}</span>
        <span>次</span>
      </div>
      <div class="btn-group">
        <div class="btn" @click="() => handleStop()">结束</div>
      </div>
    </div>
    <div
      v-for="item in data"
      :key="item.id"
      class="click-item"
      :style="{
        left: `${item.x}px`,
        top: `${item.y}px`,
        background: item.color,
      }"
    >
      {{ item.val }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { removeView } from '@applications/click-count/content';
import { useClickCountStore } from '@applications/click-count/store';
import { useApp } from '@store/useApp';
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';

interface ClickItem {
  x: number;
  y: number;
  id: number;
  time: number;
  color: string;
  val: number;
}

const { count, add, status, set } = useClickCountStore();

const { setPopupActive } = useApp();

const data = ref<ClickItem[]>([]);

watchEffect(() => {
  if (count.value === 0) {
    data.value = [];
  }
});

const handleClick = async (e: MouseEvent) => {
  const parent = document.getElementById('click-count');
  if (parent?.contains(e.target as Node)) return;
  if (status.value !== 1) return;
  await add(1);
  const x = e.clientX;
  const y = e.clientY;
  const id = Date.now();
  const time = Date.now();
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const val = count.value;
  data.value.push({ x, y, id, time, color, val });
};

const handleStop = () => {
  removeView();
  setPopupActive();
  set(0);
};

const canClick = computed(() => status.value === 1);

onMounted(() => {
  document.addEventListener('click', handleClick, { capture: true });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick, { capture: true });
});
</script>

<style lang="less" scoped shadow="clickCount">
.event-effect {
  pointer-events: none;
  background-color: rgb(0 0 0 / 50%);
}

.click-count {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  background-color: transparent;

  .click-header {
    position: absolute;
    display: flex;
    align-items: center;
    top: 10px;
    right: 50%;
    transform: translateX(50%);
    padding: 4px 8px;
    border-radius: 4px;
    width: 220px;

    .count-value {
      font-size: 16px;
      line-height: 36px;
    }

    .btn-group {
      display: flex;
      align-items: center;
      pointer-events: all;

      .btn {
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 8px;
        cursor: pointer;
        line-height: 36px;

        &:hover {
          color: #da2cda;
        }
      }
    }
  }

  .click-item {
    position: absolute;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    pointer-events: all;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}
</style>
