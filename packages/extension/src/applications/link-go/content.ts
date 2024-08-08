import { useLinkGoStore } from './store';

const { rules, parseUrl, inited } = useLinkGoStore();

export const linkGo = async () => {
  while (!inited.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const url = window.location.href;
  let href;
  for (let i = 0; i < rules.value.length; i++) {
    href = parseUrl(url, rules.value[i]);
    if (href) break;
  }
  if (href) window.location.href = new URL(href).href;
};
