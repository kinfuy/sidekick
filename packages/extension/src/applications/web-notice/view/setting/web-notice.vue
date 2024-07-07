<template>
  <div class="web-notice">{{ whiteList }}</div>
  <ElButton @click="clear">清空缓存</ElButton>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus';
import { useWebNoticeStore } from '../../store';

const { whiteList, clear } = useWebNoticeStore();
</script>

<style lang="less" scoped></style>
