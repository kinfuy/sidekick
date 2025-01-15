import {
  injectCustomScript,
  removeCustomScript,
  sendMessageToInjectScript,
} from '@utils';
import { Message } from '@core/message';
import injectScript from './inject?script&module';
import { useApiProxyStore } from './store';

const initInject = () => {
  injectCustomScript(injectScript, {
    key: 'app-inject-mock',
    type: 'module',
  });
};

const removeInject = () => {
  removeCustomScript('app-inject-mock');
};

export const apiProxy = (opt: { key: string; data?: any }) => {
  const { key } = opt;
  console.log('apiProxy', opt);
  if (key === 'init_rules') {
    const { isCatch, getMatchUrlRules } = useApiProxyStore();
    const rules = getMatchUrlRules(window.location.href);
    sendMessageToInjectScript({
      from: Message.Form.CONTENT_MESSAGE,
      to: Message.Form.INJECT_MESSAGE,
      code: 'ApiProxy',
      data: {
        key: 'init_rules',
        data: {
          rules,
          isCatch: isCatch.value,
        },
      },
    });
    if (rules.length > 0 || isCatch.value) {
      initInject();
    } else {
      removeInject();
    }
  }
  if (key === 'clear_record') {
    sendMessageToInjectScript({
      from: Message.Form.CONTENT_MESSAGE,
      to: Message.Form.INJECT_MESSAGE,
      code: 'ApiProxy',
      data: opt,
    });
  }
};
