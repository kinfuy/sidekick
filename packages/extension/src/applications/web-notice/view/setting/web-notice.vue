<template>
  <div class="web-notice">
    <div class="flex justify-end">
      <ElButton size="small" type="primary" link @click="clear">
        清空缓存
      </ElButton>
    </div>
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
import { ElButton, ElTag } from 'element-plus';
import { useWebNoticeStore } from '../../store';

const { whiteList, clear, removeWeb } = useWebNoticeStore();
</script>

<style lang="less" scoped>
.web-notice-tag {
  margin-left: 8px;
}
</style>
