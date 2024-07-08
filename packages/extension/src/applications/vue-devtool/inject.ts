const getVueVersion = (_version: string) => {
  const match = _version.match(/(?<version>[0-9]{1,})/);
  return Number(match?.groups?.version || 3);
};
const getVueInstence = (node: any) => {
  let vue;
  if (node.__vue_app__) vue = node.__vue_app__;
  if (node.__vue__) vue = node.__vue__.$options._base;
  return vue;
};

export const vueDevtool = () => {
  let Vue: any, node: any;
  const walker = document.createTreeWalker(document.body, 1);
  const _global = globalThis as any;
  const _devtoolHook = _global.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  // eslint-disable-next-line no-cond-assign
  while ((node = walker.nextNode()) && !Vue) {
    Vue = getVueInstence(node);
  }
  if (Vue) {
    Vue.config.devtools = true;
    if (_devtoolHook) {
      const version = getVueVersion(Vue.version);
      if (version === 2) {
        _devtoolHook.emit('init', Vue);
      }
      if (version === 3) {
        // TODO 无法开启vuex router plugin
        const types = {
          Fragment: undefined,
          Text: undefined,
          Comment: undefined,
          Static: undefined,
        };
        _devtoolHook.emit('app:init', Vue, Vue.version, types);

        const unmount = Vue.unmount.bind(Vue);
        Vue.unmount = function () {
          _devtoolHook.emit('app:unmount', Vue);
          unmount();
        };
      }
      // if (Vue?.config?.globalProperties?.$store) {
      //   devtoolStorePlugin(Vue?.config?.globalProperties?.$store, _devtoolHook);
      // }
      console.log('[DevTester: VueDevtool] vue devtools now is enabled');
    }
  } else {
    window.postMessage(
      {
        key: '_vue-devtools-send-message',
        message: {
          devtoolsEnabled: true,
          vueDetected: false,
        },
      },
      '*',
    );
    console.log('[DevTester: VueDevtool]vue devtools now is disabled');
  }
};
