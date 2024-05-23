<template>
  <div class="link-go">
    <div class="link-go-header">
      <div class="link-go-title">Link Go</div>
    </div>
    <div class="link-content">
      <ElTag v-for="rule in rules" :key="rule.value" type="info" closable>{{
        `${rule.type} -> ${rule.value}`
      }}</ElTag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLinkGoStore } from '@applications/link-go/store';

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
