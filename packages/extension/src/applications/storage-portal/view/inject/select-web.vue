<template>
  <div>传送门</div>
  <Empty v-if="!webs.length" />
  <div v-else class="select-web">
    <div v-for="item in webs" :key="item.url" class="select-web-item">
      <a
        class="select-web-title link"
        target="_blank"
        :href="`https://${item.url}`"
        >{{ item.title }}</a
      >
      <div
        class="select-web-btn btn-text flex-shrink"
        @click="handleSync(item)"
      >
        同步到本地
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Empty from '@components/common/Empty/Empty';
import type { PropType } from 'vue';

const props = defineProps({
  webs: {
    type: Array as PropType<{ url: string; title: string }[]>,
    default: () => [],
  },
});

const emit = defineEmits(['sync']);

const handleSync = (item: { url: string; title: string }) => {
  emit('sync', item);
};
</script>
