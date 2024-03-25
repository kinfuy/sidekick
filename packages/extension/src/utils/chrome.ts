export interface PostMessage {
  from: string;
  code: string;
  data?: Record<string, any>;
}

export const storage = {
  set: (key: string, value: string) => {
    return chrome.storage.sync.set({ [key]: value });
  },
  get: async <T>(key: string) => {
    const store = await chrome.storage.sync.get(key);
    return store[key] ? (JSON.parse(store[key]) as T) : ({} as T);
  },
};

// 获取当前选项卡ID
export const getActiveTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

// 创建tab
export const createtab = async (url: string) => {
  return chrome.tabs.create({ url });
};

/**
 * 发送消息给插件
 * @param message PostMessage
 */
export const sendMessageToExtension = async (message: PostMessage) => {
  return chrome.runtime.sendMessage(message);
};

/**
 * 插件消息传递 活跃的tab
 * @param message
 */
export const sendMessageToContentScript = async (message: PostMessage) => {
  const activeTab = await getActiveTab();
  if (activeTab) {
    return chrome.tabs.sendMessage(Number(activeTab.id), message);
  }
};

/**
 * 获取插件相对地址
 * @param path
 * @returns
 */
export const getChromeUrl = (path: string) => {
  return chrome.runtime.getURL(path);
};
