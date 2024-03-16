<template>
  <div class="sidekick-tool">
    <img class="sidekick-tool-logo" :src="logo" :title="title" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  logo: {
    type: String,
  },
});
</script>

<style lang="less" shadow>
.sidekick-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;

  .sidekick-tool-logo {
    width: 24px;
    height: 24px;
  }
  .sidekick-tool-text {
    font-size: 12px;
    color: #fff;
  }
}
</style>
