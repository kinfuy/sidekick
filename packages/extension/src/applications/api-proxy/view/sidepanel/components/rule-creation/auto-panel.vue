<template>
  <div class="auto-panel">
    <RecordList />
  </div>
</template>

<script setup lang="ts">
import RecordList from '../api-record/record-list.vue';
</script>

<style scoped lang="less">
.auto-panel {
  background: #ffffff;
  border-radius: 0 0 8px 8px;
}
</style>
