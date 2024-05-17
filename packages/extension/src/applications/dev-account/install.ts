import type { App } from 'vue';
import DevAccount from './view/inject/dev-account.vue';

export default (app: App) => {
  app.component('InjectDevAccount', DevAccount);
};
