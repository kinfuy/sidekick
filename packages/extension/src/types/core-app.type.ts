import type { PostMessage } from '@utils';

export interface AppEntry {
  name: string;
  title: string;
  logo: string;
  inner: boolean; // 是否是内部应用
  linkUrl?: string;
  isLogin?: boolean; // 是否需要登录
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

  onInstalled?: () => void; // 插件安装
  onInit?: () => void; // 打开浏览器
  onAlarms?: (alarm: chrome.alarms.Alarm) => void;

  onGetData?: (opt: { key: string; opt: any }) => void;
  onSendData?: (opt: { key: string; opt: any }) => void;
  onOpenChromeUrl?: (opt: { openUrl: string; extra?: any }) => void;
  onOpenWindow?: (opt: { openUrl: string; extra?: any }) => void;

  onContextMenusClick?: (option: {
    e: chrome.contextMenus.OnClickData;
    tab?: chrome.tabs.Tab;
  }) => void;

  onPopupOpen?: (msg: PostMessage) => void;
  onPopupClose?: () => void;

  onTabCreate?: (tab: any) => void;
  onTabRemove?: (tab: any) => void;
  onTabUpdate?: (tab: any) => void;
  onTabMove?: (tab: any) => void;
  onTabReplaced?: (tab: any) => void;
  onTabActiveChange?: (opt: { tabId: number; windowId: number }) => void;

  /**
   * content 快捷键
   */
  onShortcut?: (opt: { key: string; data: any }) => void;
  /**
   *  onContentActive === onContentInit onUrlChange onPageshow onDocVisibilitychange onDocDOMContentLoaded
   * */
  onContentActive?: (opt: { url: string }) => void;
  onContentFocus?: (opt: {
    url: string;
    title: string;
    favIconUrl: string;
  }) => void;
  onContentBlur?: (opt: { url: string }) => void;
  onContentInit?: ({ url }: { url: string }) => void;
  onDocDOMContentLoaded?: ({ url }: { url: string }) => void;
  onDocVisibilitychange?: (opt: { visible: boolean; url: string }) => void;
  onUrlChange?: ({ url, event }: { url: string; event: any }) => void;
  onDocLoad?: ({ url }: { url: string }) => void;
  onPageshow?: ({ url }: { url: string }) => void;

  onError?: (opt: { key: string; message: string }) => void;
  // 应用自定义事件
  onCustomAction?: (opt: { key: string; data: any }) => void;
}

export interface App extends AppEntry {
  hooks: Application;
}

export type ApplicationHook = (
  options: any,
) => (() => void) | void | Promise<(() => void) | void>;
