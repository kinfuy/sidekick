<template>
  <div class="link-go">
    <div class="operate-list">
      <ElButton size="small" @click="() => handleAdd()">新增规则</ElButton>
    </div>
    <div class="link-content">
      <div class="m-b-1">
        <span>有效规则集:</span>
      </div>
      <ElTag
        v-for="rule in rules"
        :key="rule.value"
        closable
        @="() => handleRemove(rule)"
        class="m-r-1"
        type="info"
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
    <AddRule ref="addRuleRef" />
  </div>
</template>

<script lang="ts" setup>
import type { LinkRule } from '@applications/link-go/store';
import { useLinkGoStore } from '@applications/link-go/store';
import { ElTag } from 'element-plus';
import { ref } from 'vue';
import AddRule from './add-rule.vue';
const { rules, removeRule } = useLinkGoStore();

const addRuleRef = ref<InstanceType<typeof AddRule>>();
const handleAdd = () => {
  addRuleRef.value?.show();
};

const handleRemove = (rule: LinkRule) => {
  removeRule(rule);
};
</script>

<style lang="less" scoped>
.link-go {
  padding: 10px;

  .operate-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
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
