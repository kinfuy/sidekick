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

/**
 * 向平台注入动态js
 * @param path
 * @returns
 */
export const injectCustomJs = (path: string) => {
  const temp = document.createElement('script');
  if (!temp) return new Error('发生了错误');
  temp.setAttribute('type', 'text/javascript');
  temp.src = getChromeUrl(path);
  temp.onload = function () {
    if (temp.parentNode) {
      temp.parentNode.removeChild(temp);
    } else {
      document.removeChild(temp);
    }
  };
  document.head.appendChild(temp);
};

/**
 * 向平台注入动态js
 * @param injectscript  es module
 * @returns
 */
export const injectCustomScript = (injectscript: any) => {
  const script = document.createElement('script');
  script.src = getChromeUrl(injectscript);
  script.type = 'module';
  if (!script) return new Error('发生了错误');
  script.onload = function () {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    } else {
      document.removeChild(script);
    }
  };
  document.head.appendChild(script);
};

/**
 * 创建devtool
 */
export const createDevtoolsanels = () => {
  return chrome.devtools.panels.create();
};

/**
 * 获取store
 */
export const getStoreKey = <T>(keys: Array<string>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const store: Record<string, any> = {};
    keys.forEach((x) => {
      store[x] = null;
    });
    try {
      chrome.storage.local.get(store, (rst) => {
        resolve(rst as T);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 设置store
 */
export const setStore = (store: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(store, () => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 清理插件所有store
 */
export const clearStore = (): void => {
  chrome.storage.local.clear();
};

/**
 * 插件消息传递 活跃的tab
 * @param message
 */
export const sendMessageToContentScriptById = (
  tabId: string | number,
  message: PostMessage,
) => {
  return chrome.tabs.sendMessage(Number(tabId), message);
};
/**
 * 所有tab广播信息
 * @param message
 * @returns
 */
export const sendMessageToContentScriptAllTabs = (message: PostMessage) => {
  return new Promise((resolve) => {
    try {
      chrome.tabs.query({ currentWindow: true }, async (tabs) => {
        if (tabs && tabs.length > 0) {
          try {
            const response = [];
            for (let i = 0; i < tabs.length; i++) {
              const rst = await chrome.tabs
                .sendMessage(Number(tabs[i].id), message)
                .catch((err) => {
                  response.push({
                    status: 'fail',
                    tabId: tabs[i].id,
                    response: err,
                  });
                });
              response.push({
                status: 'success',
                tabId: tabs[i].id,
                response: rst,
              });
            }
            resolve(response);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('当前没有活跃的tabs');
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

/**
 * 谷歌监听消息
 * @param callback
 */
export const chromeAddListenerMessage = (
  callback: (request: PostMessage) => void,
) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse();
    callback(request);
    return false;
  });
};

/**
 * 创建鼠标右键
 * @param title
 * @param handler
 */
export const createContextMenus = (key: string, title: string, extra?: any) => {
  try {
    chrome.contextMenus.create({
      id: key,
      title,
      ...extra,
    });
  } catch (error) {}
};

/**
 * 移除右键菜单
 * @param key
 */
export const removeContextMenus = (key: string) => {
  try {
    chrome.contextMenus.remove(key);
  } catch (error) {}
};
/**
 * 更新鼠标右键
 * @param key
 * @param title
 * @param extra
 */
export const setContextMenus = (key: string, title: string, extra?: any) => {
  chrome.contextMenus.update(key, {
    title,
    ...extra,
  });
};

/**
 * 创建通知
 * @param notificationId
 * @param options "basic", "image", "list", or "progress"
 * @returns
 */
export const createNotifications = (
  notificationId: string,
  options: chrome.notifications.NotificationOptions,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.notifications.create(notificationId, options, () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * devtool,在宿主环境执行script
 * @param script
 * @returns
 */
export const devToolInjectScriptResult = (script: string) => {
  return new Promise((resolve) => {
    try {
      chrome.devtools.inspectedWindow.eval(script, {}, (res) => {
        resolve(res);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

// 获取当前选项卡ID
export const getCurrentTabId = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs.length ? tabs[0].id : null);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// 获取当前选项卡ID
export const getCurrentTab = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs.length ? tabs[0] : null);
      });
    } catch (error) {
      reject(error);
    }
  });
};
