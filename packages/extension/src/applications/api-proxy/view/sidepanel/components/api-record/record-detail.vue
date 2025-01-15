<template>
  <div class="record-detail">
    <div class="detail-section">
      <!-- 请求信息 -->
      <div class="detail-group">
        <div class="group-title">请求信息</div>
        <div class="detail-row">
          <div class="detail-header">请求头</div>
          <pre class="detail-content">{{
            JSON.stringify(record.request.headers, null, 2)
          }}</pre>
        </div>
        <div class="detail-row">
          <div class="detail-header">请求体</div>
          <pre class="detail-content">{{
            JSON.stringify(record.request.body, null, 2)
          }}</pre>
        </div>
      </div>

      <!-- 响应信息 -->
      <div class="detail-group">
        <div class="group-title">响应信息</div>
        <div class="detail-row">
          <div class="detail-header">响应头</div>
          <pre class="detail-content">{{
            JSON.stringify(record.response.headers, null, 2)
          }}</pre>
        </div>
        <div class="detail-row">
          <div class="detail-header">响应体</div>
          <pre class="detail-content">{{
            JSON.stringify(record.response.body, null, 2)
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiRecord } from '../../../../store';

defineProps<{
  record: ApiRecord;
}>();
</script>

<style scoped lang="less">
.record-detail {
  padding: 0;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  transform-origin: top;
  animation: expandDown 0.2s ease-out;

  .detail-section {
    padding: 12px;
  }

  .detail-group {
    & + .detail-group {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
    }
  }

  .group-title {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  .detail-row {
    & + .detail-row {
      margin-top: 8px;
    }
  }

  .detail-header {
    font-size: 11px;
    color: #6b7280;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .detail-content {
    font-size: 11px;
    line-height: 1.4;
    margin: 0;
    padding: 6px;
    background: #ffffff;
    border-radius: 3px;
    overflow-x: auto;
    color: #1f2937;
    white-space: pre-wrap;
    word-break: break-all;
    border: 1px solid #e5e7eb;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }
  }
}

@keyframes expandDown {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style>
