import type { PostMessage } from '@utils';

export interface AppEntry {
  name: string;
  title: string;
  logo: string;
  inner: boolean; // 是否是内部应用
  linkUrl?: string;
  isLogin?: boolean;
  description?: string;
  width?: string;
  popupApp?: boolean;
  contentApp?: boolean;
  settingApp?: boolean;
}

export interface CoreApp extends AppEntry {
  active: boolean;
}

export interface CoreStoreInstance {
  apps: CoreApp[];
  openSetting?: {
    currentApp: string;
    params: any;
  };
}

export interface Application extends Record<string, any> {
  onActiveChange?: ({
    name,
    active,
  }: {
    name: string;
    active: boolean;
  }) => void; // app 状态变化
  onContentInit?: ({ url }: { url: string }) => void;
  onInstalled?: () => void; // 插件安装
  onInit?: () => void; // 打开浏览器
  onPopupOpen?: (msg: PostMessage) => void;
  onContextMenusClick?: (option: {
    e: chrome.contextMenus.OnClickData;
    tab?: chrome.tabs.Tab;
  }) => void;
  onPopupClose?: () => void;
  onNewTab?: () => void;
  onCollectSync?: () => void;
  onDocDOMContentLoaded?: ({ url }: { url: string }) => void;
  onDocVisibilitychange?: (opt: { visible: boolean }) => void;
  onUrlChange?: ({ url, event }: { url: string; event: any }) => void;
  onDocLoad?: ({ url }: { url: string }) => void;
  onPageshow?: ({ url }: { url: string }) => void;
  onAlarms?: (alarm: chrome.alarms.Alarm) => void;
  onMagicClick?: (opt: { name: string }) => void;
  onCoreStoreChange?: () => void;
  onTabUpdate?: () => void;
  onGetData?: (opt: { key: string; opt: any }) => void;
  onSendData?: (opt: { key: string; opt: any }) => void;
  onError?: (opt: { key: string; message: string }) => void;
  onOpenChromeUrl?: (opt: { openUrl: string; extra?: any }) => void;
  onOpenWindow?: (opt: { openUrl: string; extra?: any }) => void;
}

export interface App extends AppEntry {
  hooks: Application;
}

export type ApplicationHook = (
  options: any,
) => (() => void) | void | Promise<(() => void) | void>;
