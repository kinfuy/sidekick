import { initInject } from './inject';

const initContent = () => {
  initInject();
  const timer = setTimeout(() => {
    const isExist = initInject();
    if (isExist) clearTimeout(timer);
  }, 100);
};

initContent();
