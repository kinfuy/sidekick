<template>
  <div class="active-rules section">
    <div class="section-header">
      <h3>当前生效的规则</h3>
      <div class="header-actions">
        <button v-if="rules.length > 0" class="btn-text" @click="clearAllRules">
          清空全部
        </button>
      </div>
    </div>

    <div class="rules-container">
      <RuleItem
        v-for="rule in rules"
        :key="rule.id"
        :rule="rule"
        @remove="removeRule"
      />
      <ElEmpty v-if="rules.length === 0" description="暂无生效规则" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElEmpty } from 'element-plus';
import { useApiProxyStore } from '../../../../store';
import RuleItem from './rule-item.vue';

const { rules } = useApiProxyStore();

const removeRule = (ruleId: string) => {};

const clearAllRules = () => {};
</script>

<style scoped lang="less">
.active-rules {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-size: 16px;
    font-weight: 500;
    color: #111827;
    margin: 0;
  }
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-text {
  font-size: 12px;
  padding: 4px 8px;
  color: #6b7280;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #dc2626;
    background: #fee2e2;
  }
}

.rules-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
