import { injectCustomScript, removeCustomScript } from '@utils';
import injectScript from './inject?script&module';
import { useMockStore } from './store';

const initInject = () => {
  injectCustomScript(injectScript, {
    key: 'app-inject-mock',
    type: 'module',
  });
};

const removeInject = () => {
  removeCustomScript('app-inject-mock');
};

export const mock = () => {
  const { rules } = useMockStore();
  initInject();
  if (rules.value.length > 0) {
    initInject();
  } else {
    removeInject();
  }
};
