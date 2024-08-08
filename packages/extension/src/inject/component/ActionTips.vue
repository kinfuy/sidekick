<template>
  <div v-if="actions.length" class="action-tips z-index">
    <div
      v-for="action in actions"
      :key="action.title"
      class="action-tips-item"
      @click="handleShotcut(action)"
    >
      <div class="action-tips-app">
        <img class="app-logo" :src="action.appIcon" />
      </div>
      <div class="action-tips-title">
        {{ action.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useApp } from '@store/useApp';
import { sendMessageToExtension, transformUrl } from '@utils';
import { Message } from '@core/message';
import type { ContentActionDetail } from '../../store/useContentAction';
import { useContentAction } from '../../store/useContentAction';

interface Action extends ContentActionDetail {
  appName: string;
  appIcon: string;
}

const { get, isUpdate } = useContentAction();
const { getAppInfo } = useApp();

const actions = ref<Action[]>([]);

const init = async () => {
  actions.value = [];
  const _actions = await get(transformUrl(window.location.href));
  if (_actions.length) {
    actions.value = _actions.map((action) => {
      const app = getAppInfo(action.code);
      return {
        appIcon: app.logo,
        appName: app.name,
        ...action,
      };
    });
  }
};

watch(
  () => isUpdate.value,
  (val) => {
    init();
  },
);

init();

const handleShotcut = (action: Action) => {
  sendMessageToExtension({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onShortcut',
    data: {
      key: action.key,
      data: action.data || {},
    },
  });
};
</script>
