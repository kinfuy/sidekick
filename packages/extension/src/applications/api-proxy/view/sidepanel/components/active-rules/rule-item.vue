<template>
  <div class="rule-item">
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
            <i class="icon-arrow">→</i>
            {{ rule.redirect.url }}
          </span>
        </template>
        <template v-else-if="rule.response">
          <span class="mock">Mock</span>
        </template>
      </div>
    </div>
    <div class="rule-actions">
      <button class="btn-icon" @click="$emit('remove', rule.id)">
        <i class="icon-delete">×</i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProxyRule } from '../../../../store';

defineProps<{
  rule: ProxyRule;
}>();

defineEmits<{
  (e: 'remove', id: string): void;
}>();
</script>

<style scoped lang="less">
.rule-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  transition: all 0.2s;

  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rule-detail {
  font-size: 13px;
  color: #6b7280;

  .redirect {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #6366f1;
  }

  .mock {
    background: #f3e8ff;
    color: #7e22ce;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
}

.rule-actions {
  padding-left: 12px;
}

.btn-icon {
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1;

  &:hover {
    background: #fee2e2;

    .icon-delete {
      color: #dc2626;
    }
  }
}

.icon-delete {
  font-style: normal;
  color: #9ca3af;
  font-size: 16px;
}

.icon-arrow {
  font-style: normal;
}

@media (max-width: 600px) {
  .rule-item {
    flex-direction: column;
    gap: 8px;
  }

  .rule-actions {
    padding-left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
