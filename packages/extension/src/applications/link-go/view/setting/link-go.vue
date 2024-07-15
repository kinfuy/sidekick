<template>
  <div class="link-go">
    <div class="link-content">
      <div class="m-b-1">
        <span>有效规则集:</span>
      </div>
      <ElTag v-for="rule in rules" :key="rule.value" class="m-r-1" type="info"
        >{{ `${rule.value}` }}
      </ElTag>
      <div class="link-example">
        <div class="link-example-title">示例:</div>
        <div v-for="rule in rules" :key="rule.value">
          <div class="link-example-description">
            {{ `${rule.description}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLinkGoStore } from '@applications/link-go/store';
import { ElTag } from 'element-plus';
const { rules } = useLinkGoStore();
</script>

<style lang="less" scoped>
.link-go {
  padding: 10px;
}

.link-example {
  margin-top: 16px;

  .link-example-title {
    margin: 16px 0;
    font-size: 12px;
    color: #999;
  }

  .link-example-description {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
}
</style>
