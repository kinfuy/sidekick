<template>
  <div class="link-go">
    <div class="link-go-header">
      <div class="link-go-title">Link Go</div>
    </div>
    <span class="line m-b-1 m-t-1" />
    <div class="link-content">
      <div class="m-b-1">
        <span>有效规则集:</span>
      </div>
      <ElTag v-for="rule in rules" :key="rule.value" class="m-r-1" type="info"
        >{{ `${rule.value}` }}
      </ElTag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLinkGoStore } from '@applications/link-go/store';
import { ElButton, ElDivider, ElTag } from 'element-plus';
const { rules } = useLinkGoStore();
</script>

<style lang="less" scoped>
.link-go {
  padding: 10px;
}

.link-go-header {
  height: 28px;

  .link-go-title {
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
}
</style>
