<template>
  <div v-if="whiteList.length" class="web-notice">
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
  <ElEmpty v-else description="暂无数据" />
</template>

<script lang="ts" setup>
import { ElEmpty, ElTag } from 'element-plus';
import { useWebNoticeStore } from '../../store';

const { whiteList, removeWeb } = useWebNoticeStore();
</script>

<style lang="less" scoped>
.web-notice-tag {
  margin-left: 8px;
}
</style>
