import flow from '@assets/app/flow.svg';
import { getChromeUrl } from '../../utils';
import type { App } from '@/types/core-app.type';

export const UiFlow: App = {
  name: 'UiFlow',
  title: 'UI 工作流',
  logo: getChromeUrl(flow),
  inner: false,
  settingApp: true,
  popupApp: true,
  contentApp: true,
  hooks: {},
};
