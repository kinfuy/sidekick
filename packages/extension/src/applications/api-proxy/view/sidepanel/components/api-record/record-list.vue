<template>
  <div class="record-list">
    <div class="auto-panel-header">
      <div class="filter-group">
        <el-input
          v-model="apiFilter"
          placeholder="搜索 API"
          prefix-icon="Search"
          clearable
        />
      </div>
      <div class="control-group">
        <div class="switch-wrapper">
          <ElSwitch
            :model-value="isCatch"
            @change="(value) => refreshApiRecords(value as boolean)"
          />
          <span class="auto-capture-text">自动捕获</span>
        </div>
        <button class="btn-text" @click="clearRecords">清空</button>
      </div>
    </div>

    <div class="records-container">
      <RecordItem
        v-for="record in filteredRecords"
        :key="record.id"
        :record="record"
        :is-expanded="expandedRecordId === record.id"
        @toggle-detail="toggleRecordDetail"
        @create-rule="createRuleFromRecord"
      />
      <ElEmpty v-if="filteredRecords.length === 0" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElEmpty, ElSwitch } from 'element-plus';
import { sendMessageToContentScript } from '@utils';
import { Message } from '@core/message';
import { useApiProxyStore } from '../../../../store';
import type { ApiRecord } from '../../../../store';
import RecordItem from './record-item.vue';

const { catchRecords, isCatch, setCatchRecords, setIsCatch } =
  useApiProxyStore();

const apiFilter = ref('');
const expandedRecordId = ref<string | null>(null);

// 过滤记录
const filteredRecords = computed(() => {
  return catchRecords.value.filter((record) => {
    return (
      !apiFilter.value ||
      record.url.toLowerCase().includes(apiFilter.value.toLowerCase())
    );
  });
});

// 切换详情展开状态
const toggleRecordDetail = (recordId: string) => {
  expandedRecordId.value =
    expandedRecordId.value === recordId ? null : recordId;
};

// 从记录创建规则
const createRuleFromRecord = (record: ApiRecord) => {
  // TODO: 实现创建规则的逻辑
  console.log('创建规则:', record);
};

// 刷新API记录
const refreshApiRecords = (value: boolean) => {
  setIsCatch(value);
  if (value) {
    setTimeout(() => {
      sendMessageToContentScript({
        to: Message.Target.CONTENT,
        from: Message.Form.SIDEPANEL_MESSAGE,
        code: 'ContentCore',
        data: {
          key: 'doc-reload',
          data: {
            reload: true,
          },
        },
      });
    }, 500);
  }
};

// 清空记录
const clearRecords = () => {
  setCatchRecords([]);
  expandedRecordId.value = null;
  sendMessageToContentScript({
    from: Message.Form.SIDEPANEL_MESSAGE,
    to: Message.Form.CONTENT_MESSAGE,
    code: 'ApiProxy',
    data: {
      key: 'clear_record',
    },
  });
};
</script>

<style scoped lang="less">
.record-list {
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 12px;
  background: #fff;
}

.auto-panel-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
}

.filter-group {
  flex: 1;
  min-width: 0;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;

  .switch-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .auto-capture-text {
    font-size: 12px;
    color: #6b7280;
  }
}

.records-container {
  padding: 8px;
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
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
}

:deep(.el-input__wrapper) {
  background-color: #f9fafb;
  border-color: #e5e7eb;
  box-shadow: none !important;

  &:hover {
    border-color: #d1d5db;
  }

  &.is-focus {
    border-color: #3b82f6;
    background-color: #ffffff;
  }
}

// 滚动条样式
&::-webkit-scrollbar {
  width: 6px;
}

&::-webkit-scrollbar-track {
  background: #f1f1f1;
}

&::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;

  &:hover {
    background: #9ca3af;
  }
}
</style>
