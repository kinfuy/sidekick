<template>
  <div class="api-proxy">
    <div class="api-proxy-header">
      <div class="api-proxy-header-left">
        <h2>接口代理</h2>
      </div>
    </div>

    <RuleCreation />

    <ActiveRules />
  </div>
</template>

<script setup lang="ts">
import RuleCreation from './components/rule-creation/index.vue';
import ActiveRules from './components/active-rules/index.vue';
</script>

<style scoped lang="less">
.api-proxy {
  padding: 16px;
  background: #f5f5f5;
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 8px;
  }
}

.api-proxy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
</style>
