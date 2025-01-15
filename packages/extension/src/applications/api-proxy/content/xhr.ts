export interface OpenBody {
  method: string;
  url: string | URL;
  async: boolean;
  username?: string | null;
  password?: string | null;
}

export interface XHRResponseInfo {
  response: ResponseBody;
  status: number;
  headers: string;
}

export interface GlobalXmlContext {
  openContent?: OpenBody;
  sendContent?: SendBody;
  responseContext?: ResponseBody;
  xhr: XMLHttpRequest;
  requestStartTime?: number;
  uploadSize?: number;
  downloadSize?: number;
  isStreaming?: boolean;
  requestHeaders: Record<string, string>;
}

export type ResponseBody = XMLHttpRequest['response'];

export type SendBody = Document | XMLHttpRequestBodyInit | null | undefined;

export type BeforeXmlOpen = (
  body: OpenBody,
  context: GlobalXmlContext,
) => OpenBody;

export type AfterXmlOpen = (body: OpenBody, context: GlobalXmlContext) => void;

export type BeforeXmlSend = (
  body: SendBody,
  context: GlobalXmlContext,
) => SendBody;

export type AfterXmlSend = (body: SendBody, context: GlobalXmlContext) => void;

export type BeforeXmlResponse = (
  response: {
    response: ResponseBody;
    status: number;
    headers: string;
  },
  context: GlobalXmlContext,
) => ResponseBody | void;

export type AfterXmlResponse = (
  body: ResponseBody,
  context: GlobalXmlContext,
) => void;

export interface ProgressInfo {
  loaded: number;
  total: number;
  lengthComputable: boolean;
}

export type BeforeXmlProgress = (
  info: ProgressInfo,
  context: GlobalXmlContext,
) => ProgressInfo | void;

export interface XMLHttpHooks {
  beforeXmlOpen?: BeforeXmlOpen;
  afterXmlOpen?: AfterXmlOpen;
  beforeXmlSend?: BeforeXmlSend;
  afterXmlSend?: AfterXmlSend;
  beforeXmlResponse?: BeforeXmlResponse;
  afterXmlResponse?: AfterXmlResponse;
  beforeUploadProgress?: BeforeXmlProgress;
  beforeDownloadProgress?: BeforeXmlProgress;
}

export interface XMLHttpRequestParameter extends XMLHttpHooks {
  originXML: typeof window.XMLHttpRequest;
}

/**
 * 创建进度事件处理器
 */
function createProgressHandler(
  hook: BeforeXmlProgress | undefined,
  context: GlobalXmlContext,
  errorMessage: string,
) {
  return function (event: ProgressEvent<XMLHttpRequestEventTarget>) {
    try {
      if (hook) {
        const progressInfo: ProgressInfo = {
          loaded: event.loaded,
          total: event.total,
          lengthComputable: event.lengthComputable,
        };

        const modifiedProgress = hook(progressInfo, context);
        if (modifiedProgress) {
          Object.assign(event, modifiedProgress);
        }
      }
    } catch (error) {
      console.error(errorMessage, error);
    }
  };
}

/**
 * 创建 open 方法代理
 */
function createOpenProxy(
  xhr: XMLHttpRequest,
  originalOpen: typeof XMLHttpRequest.prototype.open,
  hooks: XMLHttpHooks,
  context: GlobalXmlContext,
) {
  return function (
    method: string,
    url: string | URL,
    async: boolean = true,
    username?: string | null,
    password?: string | null,
  ) {
    try {
      const openBody = { method, url, async, username, password };
      context.openContent = openBody;

      const modifiedArgs = hooks.beforeXmlOpen?.(openBody, context) ?? openBody;

      hooks.afterXmlOpen?.(modifiedArgs, context);

      return originalOpen.call(
        xhr,
        modifiedArgs.method,
        modifiedArgs.url,
        modifiedArgs.async,
        modifiedArgs.username,
        modifiedArgs.password,
      );
    } catch (error) {
      console.error('Error in XHR open:', error);
      throw error;
    }
  };
}

/**
 * 处理响应数据的修改
 */
function handleResponseModification(
  xhr: XMLHttpRequest,
  modifiedResponse: ResponseBody,
) {
  const originalResponseType = xhr.responseType;
  const originalResponseText = xhr.responseText;
  const originalStatus = xhr.status;
  const originalStatusText = xhr.statusText;

  Object.defineProperties(xhr, {
    response: {
      configurable: true,
      enumerable: true,
      get: () => modifiedResponse,
    },
    responseType: {
      configurable: true,
      enumerable: true,
      get: () => {
        if (modifiedResponse instanceof Blob) return 'blob';
        if (modifiedResponse instanceof ArrayBuffer) return 'arraybuffer';
        if (typeof modifiedResponse === 'string') return '';
        if (typeof modifiedResponse === 'object') return 'json';
        return originalResponseType;
      },
    },
    responseText: {
      configurable: true,
      enumerable: true,
      get: () => {
        if (typeof modifiedResponse === 'string') {
          return modifiedResponse;
        }
        if (typeof modifiedResponse === 'object') {
          return JSON.stringify(modifiedResponse);
        }
        return originalResponseText;
      },
    },
    status: {
      configurable: true,
      enumerable: true,
      get: () => originalStatus,
    },
    statusText: {
      configurable: true,
      enumerable: true,
      get: () => originalStatusText,
    },
  });

  if (typeof modifiedResponse === 'object' && modifiedResponse !== null) {
    Object.defineProperty(xhr, 'responseJSON', {
      configurable: true,
      enumerable: true,
      get: () => modifiedResponse,
    });
  }
}

/**
 * 处理上传数据大小
 */
function handleUploadSize(data: SendBody, context: GlobalXmlContext) {
  if (data instanceof Blob) {
    context.uploadSize = data.size;
    context.isStreaming = true;
  } else if (data instanceof FormData) {
    let totalSize = 0;
    data.forEach((value) => {
      if (value instanceof Blob) {
        totalSize += value.size;
      } else if (typeof value === 'string') {
        totalSize += value.length;
      }
    });
    context.uploadSize = totalSize;
  } else if (data instanceof ArrayBuffer) {
    context.uploadSize = data.byteLength;
    context.isStreaming = true;
  }
}

/**
 * 触发 XHR 事件
 */
function triggerXHREvents(
  xhr: XMLHttpRequest,
  context: GlobalXmlContext,
  thisArg: XMLHttpRequest,
) {
  if (xhr.onload) {
    const loadEvent = new ProgressEvent('load', {
      lengthComputable: true,
      loaded: context.downloadSize || 0,
      total: context.downloadSize || 0,
    });
    xhr.onload.call(thisArg, loadEvent);
  }

  if (xhr.onloadend) {
    const loadEndEvent = new ProgressEvent('loadend', {
      lengthComputable: true,
      loaded: context.downloadSize || 0,
      total: context.downloadSize || 0,
    });
    xhr.onloadend.call(thisArg, loadEndEvent);
  }
}

/**
 * 创建 readyState 变化处理器
 */
function createReadyStateChangeHandler(
  xhr: XMLHttpRequest,
  originalStateChange: ((this: XMLHttpRequest, ev: Event) => any) | null,
  hooks: XMLHttpHooks,
  context: GlobalXmlContext,
) {
  return function (this: XMLHttpRequest, ev: Event) {
    if (xhr.readyState === 4) {
      try {
        const responseInfo: XHRResponseInfo = {
          response: xhr.response,
          status: xhr.status,
          headers: xhr.getAllResponseHeaders(),
        };

        // 保存原始响应到上下文
        context.responseContext = xhr.response;

        if (xhr.response instanceof Blob) {
          context.downloadSize = xhr.response.size;
          context.isStreaming = true;
        } else if (xhr.response instanceof ArrayBuffer) {
          context.downloadSize = xhr.response.byteLength;
          context.isStreaming = true;
        }

        const modifiedResponse = hooks.beforeXmlResponse?.(
          responseInfo,
          context,
        );

        if (modifiedResponse !== undefined) {
          if (
            typeof modifiedResponse === 'object' &&
            'response' in modifiedResponse &&
            'status' in modifiedResponse &&
            'headers' in modifiedResponse
          ) {
            handleResponseModification(xhr, modifiedResponse.response);
            context.responseContext = modifiedResponse.response;
          } else {
            // 直接处理返回的响应
            handleResponseModification(xhr, modifiedResponse);
            context.responseContext = modifiedResponse;
          }
        }

        hooks.afterXmlResponse?.(context.responseContext, context);
        triggerXHREvents(xhr, context, this);
      } catch (error) {
        console.error('Error in XHR response handling:', error);
        if (xhr.onerror) {
          const errorEvent = new ProgressEvent('error');
          xhr.onerror.call(this, errorEvent);
        }
      }
    }

    if (originalStateChange) {
      originalStateChange.call(this, ev);
    }
  };
}

/**
 * 创建 send 方法代理
 */
function createSendProxy(
  xhr: XMLHttpRequest,
  originalSend: typeof XMLHttpRequest.prototype.send,
  hooks: XMLHttpHooks,
  context: GlobalXmlContext,
) {
  return function (data: SendBody) {
    try {
      context.sendContent = data;
      handleUploadSize(data, context);

      const modifiedData = hooks.beforeXmlSend?.(data, context) ?? data;
      hooks.afterXmlSend?.(modifiedData, context);

      const originalStateChange = xhr.onreadystatechange;
      xhr.onreadystatechange = createReadyStateChangeHandler(
        xhr,
        originalStateChange,
        hooks,
        context,
      );

      return originalSend.call(xhr, modifiedData);
    } catch (error) {
      console.error('Error in XHR send:', error);
      throw error;
    }
  };
}

/**
 * 创建 XHR 代理
 */
export function createXHRProxy(
  originalXHR: typeof XMLHttpRequest,
  hooks: XMLHttpHooks,
) {
  return new Proxy(originalXHR, {
    construct(Target: typeof XMLHttpRequest) {
      const xhr = new Target();
      const context: GlobalXmlContext = {
        xhr,
        requestStartTime: Date.now(),
        requestHeaders: {},
      };

      // 代理 setRequestHeader 方法
      const originalSetRequestHeader = xhr.setRequestHeader;
      xhr.setRequestHeader = function (header: string, value: string) {
        // 保存请求头
        context.requestHeaders[header] = value;
        return originalSetRequestHeader.call(xhr, header, value);
      };

      // 添加进度处理
      xhr.upload.addEventListener(
        'progress',
        createProgressHandler(
          hooks.beforeUploadProgress,
          context,
          'Error in upload progress handler:',
        ),
      );

      xhr.addEventListener(
        'progress',
        createProgressHandler(
          hooks.beforeDownloadProgress,
          context,
          'Error in download progress handler:',
        ),
      );

      // 代理方法
      xhr.open = createOpenProxy(xhr, xhr.open, hooks, context);
      xhr.send = createSendProxy(xhr, xhr.send, hooks, context);

      return xhr;
    },
  });
}
