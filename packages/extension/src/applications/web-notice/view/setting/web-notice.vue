<template>
  <div class="web-notice">
    <ElTag
      v-for="item in whiteList"
      :key="item.url"
      class="web-notice-tag"
      closable
      @close="removeWeb(item.url)"
    >
      {{ item.url }}
    </ElTag>
  </div>
</template>

<script lang="ts" setup>
import { ElTag } from 'element-plus';
import { useWebNoticeStore } from '../../store';

const { whiteList, removeWeb } = useWebNoticeStore();
</script>

<style lang="less" scoped>
.web-notice-tag {
  margin-left: 8px;
}
</style>
