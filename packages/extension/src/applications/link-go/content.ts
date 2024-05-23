import { useLinkGoStore } from './store';

const { rules, parseUrl } = useLinkGoStore();

export const linkGo = () => {
  const url = window.location.href;
  let href;
  for (let i = 0; i < rules.value.length; i++) {
    href = parseUrl(url, rules.value[i]);
    if (href) break;
  }
  if (href) window.location.href = new URL(href).href;
};
