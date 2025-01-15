<template>
  <div
    class="record-item"
    :class="{
      expanded: isExpanded,
    }"
  >
    <div class="record-main" @click="$emit('toggleDetail', record.id)">
      <div class="url-row">{{ record.url }}</div>
      <div class="info-row">
        <div class="left-info">
          <span class="method" :class="record.method.toLowerCase()">
            {{ record.method }}
          </span>
          <span class="status" :class="getStatusClass(record.status)">
            {{ record.status }}
          </span>
          <span class="time">{{ formatTime(record.timestamp) }}</span>
        </div>
        <div class="record-actions">
          <button class="btn-text" @click.stop="$emit('createRule', record)">
            创建规则
          </button>
        </div>
      </div>
    </div>
    <RecordDetail v-show="isExpanded" :record="record" />
  </div>
</template>

<script setup lang="ts">
import type { ApiRecord } from '../../../../store';
import RecordDetail from './record-detail.vue';

defineProps<{
  record: ApiRecord;
  isExpanded: boolean;
}>();

defineEmits<{
  (e: 'toggleDetail', id: string): void;
  (e: 'createRule', record: ApiRecord): void;
}>();

// 获取状态样式类
const getStatusClass = (status: number) => {
  if (status >= 200 && status < 300) return 'success';
  if (status >= 400 && status < 500) return 'error';
  if (status >= 500) return 'server-error';
  return 'warning';
};

// 格式化时间
const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString();
};
</script>

<style scoped lang="less">
.record-item {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  transition: all 0.2s;

  & + .record-item {
    margin-top: 8px;
  }

  &.selected {
    // 移除选中样式
  }

  &.expanded {
    background-color: #f9fafb;
  }
}

.record-main {
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
}

.url-row {
  font-size: 12px;
  color: #1f2937;
  line-height: 1.4;
  margin-bottom: 4px;
  word-break: break-all;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.left-info {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.method,
.status {
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 11px;
  line-height: 1.4;
  font-weight: 500;
}

.method {
  &.get {
    background: #d1fae5;
    color: #059669;
  }
  &.post {
    background: #dbeafe;
    color: #2563eb;
  }
  &.put {
    background: #f3e8ff;
    color: #9333ea;
  }
  &.delete {
    background: #fee2e2;
    color: #dc2626;
  }
}

.status {
  &.success {
    background: #d1fae5;
    color: #059669;
  }
  &.error {
    background: #fee2e2;
    color: #dc2626;
  }
  &.server-error {
    background: #ffe4e6;
    color: #9f1239;
  }
  &.warning {
    background: #fef3c7;
    color: #d97706;
  }
}

.time {
  font-size: 11px;
  color: #6b7280;
}

.record-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.record-item:hover .record-actions {
  opacity: 1;
}

.btn-text {
  font-size: 11px;
  padding: 2px 6px;
  color: #6b7280;
  border-radius: 3px;
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
}

@media (max-width: 600px) {
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .record-actions {
    opacity: 1;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
