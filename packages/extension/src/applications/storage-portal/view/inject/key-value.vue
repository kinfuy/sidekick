<template>
  <div v-if="list.length" class="store-key-value-list">
    <div v-for="(item, index) in list" :key="index" class="key-value">
      <span class="store-key">
        <span>{{ item?.key }}</span>
        <span>
          <span
            class="operation-text m-r-1"
            @click="() => handleHide(item.key)"
            >{{ hideValue.includes(item?.key) ? '展开' : '收起' }}</span
          >
          <span class="operation-text" @click="handleDelete(item?.key)"
            >删除</span
          >
        </span>
      </span>
      <span v-if="!hideValue.includes(item?.key)" class="store-value">{{
        item?.val
      }}</span>
    </div>
  </div>
  <Empty v-else only-text text="暂无数据" />
</template>

<script lang="ts" setup>
import { type PropType, ref } from 'vue';
import Empty from '@/components/common/Empty/Empty';

defineProps({
  list: {
    type: Array as PropType<{ key: string; val: any }[]>,
    default: () => [],
  },
});

const emit = defineEmits(['delete']);

const hideValue = ref<string[]>([]);

const handleDelete = (key: string) => {
  emit('delete', key);
};

const handleHide = (key: string) => {
  if (hideValue.value.includes(key)) {
    hideValue.value = hideValue.value.filter((item) => item !== key);
  } else {
    hideValue.value.push(key);
  }
};
</script>

<style lang="less" scoped></style>
