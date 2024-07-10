export interface PostMessage {
  from: string;
  code: string;
  data?: Record<string, any>;
}

export const storage = {
  set: (key: string, value: string) => {
    return chrome.storage.local.set({ [key]: value });
  },
  get: async <T>(key: string) => {
    const store = await chrome.storage.local.get(key);
    return store[key] ? (JSON.parse(store[key]) as T) : ({} as T);
  },
  remove: (key: string) => {
    chrome.storage.local.remove(key);
  },
  clear: (): void => {
    chrome.storage.local.clear();
  },
};

// 获取tab
export const getTab = async (tabId: number) => {
  return chrome.tabs.get(tabId);
};

// 获取当前选项卡ID
export const getActiveTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

// 关闭当前活跃 tab
export const clearActiveTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs.length) {
    chrome.tabs.remove(Number(tabs[0].id));
  }
};

// 创建tab
export const createtab = async (url: string, options: any = {}) => {
  return chrome.tabs.create({ url, ...options });
};
// 创建新窗口
export const createWindow = async (url: string, options: any = {}) => {
  return chrome.windows.create({ url, ...options });
};

/**
 * 发送消息给插件
 * @param message PostMessage
 */
export const sendMessageToExtension = async (message: PostMessage) => {
  return chrome.runtime.sendMessage(message).catch((err) => {
    console.error(err);
  });
};

/**
 * 插件消息传递 活跃的tab
 * @param message
 */
export const sendMessageToContentScript = async (message: PostMessage) => {
  const activeTab = await getActiveTab();
  if (activeTab) {
    return chrome.tabs
      .sendMessage(Number(activeTab.id), message)
      .catch(() => {});
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
 * 插件消息传递 活跃的tab
 * @param message
 */
export const sendMessageToContentScriptById = (
  tabId: string | number,
  message: PostMessage,
) => {
  return chrome.tabs.sendMessage(Number(tabId), message).catch((err) => {
    console.error(err);
  });
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
  try {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      sendResponse();
      callback(request);
      return false;
    });
  } catch (error) {
    console.log(error);
  }
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

/**
 * 语言标识
 */
export const t = (key: string) => {
  return chrome.i18n.getMessage(key);
};
