<template>
  <div class="browse-behavior">
    <div v-for="web in list" :key="web.url">
      {{ JSON.stringify(web) }}
    </div>
  </div>
  <ElButton type="primary" link @click="clear">清除</ElButton>
</template>

<script lang="ts" setup>
import { useBrowseBehaviorStore } from '@applications/browse-behavior/store';
import { ElButton } from 'element-plus';
import { computed } from 'vue';

const { webStatics, clear } = useBrowseBehaviorStore();

const list = computed(() => {
  return Array.from(
    new Set(
      webStatics.value.map((w) => {
        return {
          tabId: w.tabId,
          url: w.url,
          title: w.title,
          startTime: w.startTime,
          endTime: w.endTime,
        };
      }),
    ),
  );
});
</script>

<style lang="less" scoped></style>
