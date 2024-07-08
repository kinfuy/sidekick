<template>
  <div class="dev-account">
    <div class="dev-account-header">
      <div class="dev-account-title">{{ matchWeb?.name || 'Dev Account' }}</div>
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

import { getActiveTab } from '@utils';
import { useDevAccountStore } from '../../store';
import UserDashboard from './user-dashboard.vue';
import WebDashboard from './web-dashboard.vue';

const { matchWeb, getMatch, setMatch } = useDevAccountStore();

const activeTab = ref('web');

const switchUser = (name: string) => {
  activeTab.value = 'user';
  setMatch(name);
};

const init = async () => {
  //  防止加载获取不到acticeUrl
  const tiemr = setInterval(async () => {
    const { url } = await getActiveTab();
    if (!url) return;
    const web = await getMatch(url);
    setMatch(web?.name);
    clearInterval(tiemr);
  }, 10);
};

init();

watch(
  () => activeTab.value,
  (tab) => {
    if (tab === 'web') {
      setMatch();
    }
  },
);

watch(
  () => matchWeb.value,
  (web) => {
    if (web) {
      activeTab.value = 'user';
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
.dev-account {
  padding: 10px;
}

.dev-account-header {
  height: 28px;

  .dev-account-title {
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
}
</style>
