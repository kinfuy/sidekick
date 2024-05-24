<template>
  <div class="storage-portal">
    {{ JSON.stringify({ webs, currentStorage }) }}
  </div>
</template>

<script lang="ts" setup>
import { injectPostMessage } from '@utils';
import { onMounted } from 'vue';
import { useStoragePortalStore } from '../../store';

const { webs, currentStorage } = useStoragePortalStore();

const init = () => {
  injectPostMessage({
    from: 'app_inject',
    code: 'onGetData',
    data: {
      key: 'cookies',
    },
  });
  injectPostMessage({
    from: 'app_inject',
    code: 'onGetData',
    data: {
      key: 'tabs',
    },
  });
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
