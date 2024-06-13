<template>
  <div class="browse-behavior">{{ JSON.stringify(webStatics, null, 2) }}</div>
  <ElButton type="primary" link @click="clear">清除</ElButton>
</template>

<script lang="ts" setup>
import { useBrowseBehaviorStore } from '@applications/browse-behavior/store';
import { ElButton } from 'element-plus';

const { webStatics, clear } = useBrowseBehaviorStore();
</script>

<style lang="less" scoped></style>
