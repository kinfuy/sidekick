<template>
  <div v-if="list.length" class="store-key-value-list">
    <div v-for="(item, index) in list" :key="index" class="key-value">
      <span class="store-key">
        <span>{{ item?.key }}</span>
        <span class="operation-text" @click="handleDelete(item?.key)"
          >删除</span
        >
      </span>
      <span class="store-value">{{ item?.val }}</span>
    </div>
  </div>
  <Empty v-else only-text text="暂无数据" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import Empty from '@/components/common/Empty/Empty';

defineProps({
  list: {
    type: Array as PropType<{ key: string; val: any }[]>,
    default: () => [],
  },
});
const emit = defineEmits(['delete']);
const handleDelete = (key: string) => {
  emit('delete', key);
};
</script>

<style lang="less" scoped></style>
