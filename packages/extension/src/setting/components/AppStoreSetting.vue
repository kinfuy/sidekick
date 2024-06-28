<template>
  <div class="app-store-setting">
    {{ allCustomApps }}
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '@store/useApp';

const { allCustomApps } = useApp();
</script>

<style lang="less" scoped></style>
