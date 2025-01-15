<template>
  <div class="rule-creation section">
    <div class="creation-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activePanel === tab.key }"
        @click="togglePanel(tab.key)"
      >
        <div class="tab-content">
          <div class="tab-main">
            <span class="icon">{{ tab.icon }}</span>
            <span class="title">{{ tab.title }}</span>
          </div>
          <span class="desc">{{ tab.desc }}</span>
        </div>
      </button>
    </div>

    <div v-if="activePanel" class="panels-container">
      <AutoPanel v-show="activePanel === 'auto'" />
      <QuickPanel v-show="activePanel === 'quick'" />
      <PredefinedPanel v-show="activePanel === 'predefined'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApiProxyStore } from '../../../../store';
import AutoPanel from './auto-panel.vue';
import QuickPanel from './quick-panel.vue';
import PredefinedPanel from './predefined-panel.vue';

const { setIsCatch } = useApiProxyStore();

const activePanel = ref('');

const tabs = [
  {
    key: 'auto',
    icon: '🔍',
    title: '自动获取',
    desc: '自动从当前页面获取API',
  },
  {
    key: 'quick',
    icon: '⚡️',
    title: '快速规则',
    desc: '快速创建单个规则',
  },
  {
    key: 'predefined',
    icon: '📦',
    title: '预定义规则',
    desc: '使用已配置的规则组',
  },
] as const;

const togglePanel = (panel: string) => {
  activePanel.value = activePanel.value === panel ? '' : panel;
  if (panel !== 'auto') {
    setIsCatch(false);
  }
};

onMounted(() => {
  if (activePanel.value !== 'auto') {
    setIsCatch(false);
  }
});
</script>

<style scoped lang="less">
.rule-creation {
  padding: 0;
  background: transparent;
  box-shadow: none;

  .creation-tabs {
    background: white;
    border-radius: 8px 8px 0 0;
    margin: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #e5e7eb;
    padding: 0;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
}

.tab-item {
  display: flex;
  padding: 12px;
  border: none;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;

  &:hover {
    background: #ffffff;
  }

  &.active {
    background: #ffffff;

    .title {
      color: #3b82f6;
    }

    .icon {
      opacity: 1;
    }
  }
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}

.tab-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 16px;
  opacity: 0.8;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.desc {
  font-size: 12px;
  color: #6b7280;
  margin-left: 24px; // 与图标对齐
}

.panels-container {
  margin-top: 1px;
}
</style>
