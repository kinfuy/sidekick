<template>
  <div class="predefined-panel">
    <div class="group-selector">
      <select v-model="selectedGroupId" class="select-group">
        <option value="">选择规则组</option>
        <option v-for="group in ruleGroups" :key="group.id" :value="group.id">
          {{ group.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedGroup" class="group-rules">
      <div class="group-info">
        <h3 class="group-name">{{ selectedGroup.name }}</h3>
        <p class="group-desc">{{ selectedGroup.description }}</p>
      </div>

      <div class="rules-list">
        <div
          v-for="rule in selectedGroup.rules"
          :key="rule.id"
          class="rule-item"
        >
          <div class="rule-info">
            <div class="rule-header">
              <span class="rule-tag" :class="rule.match.matchType">
                {{ rule.match.matchType }}
              </span>
              <span class="match-value">{{ rule.match.value }}</span>
            </div>
            <div class="rule-detail">
              <template v-if="rule.redirect">
                <span class="redirect">
                  重定向到: {{ rule.redirect.url }}
                </span>
              </template>
              <template v-else-if="rule.response">
                <span class="mock">Mock 数据</span>
              </template>
            </div>
          </div>
          <label class="rule-checkbox">
            <input v-model="selectedRules" type="checkbox" :value="rule.id" />
          </label>
        </div>
      </div>

      <div class="actions">
        <button
          class="btn-primary"
          :disabled="selectedRules.length === 0"
          @click="applyRules"
        >
          应用选中规则
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>请选择一个规则组</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useApiProxyStore } from '../../../../store';
import type { ProxyRule } from '../../../../store';

interface RuleGroup {
  id: number;
  name: string;
  description: string;
  rules: ProxyRule[];
}

const store = useApiProxyStore();
const selectedGroupId = ref<number | ''>('');
const selectedRules = ref<string[]>([]);

// 模拟规则组数据
const ruleGroups: RuleGroup[] = [
  {
    id: 1,
    name: '测试环境规则组',
    description: '用于测试环境的API代理规则',
    rules: [
      {
        id: '1',
        priority: 1,
        match: {
          matchType: 'contains' as const,
          value: '/api/test',
        },
        redirect: {
          url: 'http://test-api.example.com',
        },
      },
      // ... 其他规则
    ],
  },
  // ... 其他规则组
];

const selectedGroup = computed(() => {
  return ruleGroups.find((group) => group.id === selectedGroupId.value);
});

const applyRules = () => {
  if (!selectedGroup.value) return;

  const rulesToApply = selectedGroup.value.rules.filter((rule) =>
    selectedRules.value.includes(rule.id),
  );

  // 添加选中的规则
  rulesToApply.forEach((rule) => {
    store.rules.value.push({ ...rule });
  });

  // 重置选择
  selectedRules.value = [];
  selectedGroupId.value = '';
};
</script>

<style scoped lang="less">
.predefined-panel {
  background: white;
  border-radius: 0 0 8px 8px;
  padding: 16px;
}

.group-selector {
  margin-bottom: 16px;
}

.select-group {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f9fafb;
  cursor: pointer;
}

.group-info {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;

  .group-name {
    font-size: 16px;
    font-weight: 500;
    color: #111827;
    margin-bottom: 4px;
  }

  .group-desc {
    font-size: 14px;
    color: #6b7280;
  }
}

.rules-list {
  margin-bottom: 16px;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

.rule-info {
  flex: 1;
  min-width: 0;
}

.rule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.rule-tag {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;

  &.contains {
    background: #dbeafe;
    color: #1e40af;
  }
  &.equals {
    background: #dcfce7;
    color: #166534;
  }
  &.regex {
    background: #fef3c7;
    color: #92400e;
  }
}

.match-value {
  font-size: 14px;
  color: #374151;
}

.rule-detail {
  font-size: 13px;
  color: #6b7280;
}

.rule-checkbox {
  padding-left: 12px;
  display: flex;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: linear-gradient(to bottom right, #4f46e5, #3b82f6);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: linear-gradient(to bottom right, #4338ca, #2563eb);
  }
}

.empty-state {
  text-align: center;
  padding: 32px;
  color: #6b7280;
}
</style>
