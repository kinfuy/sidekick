<template>
  <div @click="openSidePanel">打开侧边栏</div>
</template>

<script setup lang="ts">
const openSidePanel = async () => {
  try {
    const [tab] = await chrome.tabs.query({
      currentWindow: true,
    });

    await chrome.sidePanel.open({ windowId: tab.windowId });
    await chrome.sidePanel.setOptions({
      path: 'sidepanel-tab.html',
      enabled: true,
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
