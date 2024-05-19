<template>
  <div class="dev-account">
    <div class="dev-account-header">
      <div class="dev-account-title">{{ matchWeb?.name || 'Dev Account' }}</div>
      <img class="dev-account-set" :src="setIcon" @click="handleSet" />
    </div>
    <ElTabs v-model="activeTab">
      <ElTabPane label="平台" name="web">
        <WebDashboard @set-match="switchUser" />
      </ElTabPane>
      <ElTabPane v-if="matchWeb" label="用户" name="user">
        <UserDashboard />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script lang="ts" setup>
import { ElTabPane, ElTabs } from 'element-plus';
import { ref, watch } from 'vue';
import set from '@assets/image/set.svg';
import { getChromeUrl } from '@utils';
import { useDevAccountStore } from '../../store';
import UserDashboard from './user-dashboard.vue';
import WebDashboard from './web-dashboard.vue';
const setIcon = chrome.runtime.getURL(set);

const { matchWeb, setMatch } = useDevAccountStore();

const activeTab = ref('web');

const switchUser = (name: string) => {
  activeTab.value = 'user';
  setMatch(name);
};

watch(
  () => activeTab.value,
  (tab) => {
    if (tab === 'web') {
      setMatch();
    }
  },
);

const handleSet = () => {
  window.open(getChromeUrl('setting.html?menu=devAccount'), '_blank');
};
</script>

<style lang="less" scoped>
.dev-account {
  padding: 10px;
}
.dev-account-header {
  height: 28px;
  position: relative;
  .dev-account-title {
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
  .dev-account-set {
    position: absolute;
    right: 10px;
    top: 6px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
