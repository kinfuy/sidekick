/**
 * 根据xpath获取元素
 * @param xpath
 * @returns
 */
export const getElementByXpath = (xpath: string) => {
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null,
  );
  return result.iterateNext();
};
/**
 * 获取元素Xpath
 * @param el
 * @returns
 */
export const getElementXPath = (
  element: Element,
  root = document.body,
): null | string => {
  if (!element) return null;
  if (element.id !== '') return `id("${element.id}")`;
  if (element === root) return `//${element.tagName}`;

  const classList: string[] = [];
  let ix = 0;
  const siblings = element.parentNode?.childNodes;
  if (siblings) {
    for (let index = 0; index < siblings.length; index += 1) {
      const sibling = siblings[index];

      if (sibling === element) {
        if (
          element.classList.length === 0 ||
          classList.includes(Array.from(element.classList).join('.'))
        ) {
          return `${getElementXPath(element.parentNode as Element)}/${
            element.tagName
          }[${ix + 1}]`;
        } else {
          const classPath = () => {
            const rst = Array.from(element.classList).map((cl) => {
              return `contains(@class,'${cl}')`;
            });
            return rst.join(' and ');
          };
          return `${getElementXPath(element.parentNode as Element)}/${
            element.tagName
          }[${classPath()}]`;
        }
      }

      if (
        sibling.nodeType === 1 &&
        (sibling as Element).tagName === element.tagName
      ) {
        ix += 1;
      }
      if (sibling instanceof HTMLElement && sibling.classList.length > 0) {
        classList.push(Array.from(sibling.classList).join('.'));
      }
    }
  }
  return null;
};

/**
 * 获取元素Xpath
 * @param el
 * @returns
 */
export const getXPath2 = (el: Element) => {
  let nodeElem = el;
  if (nodeElem.id) {
    return `//*[@id="${nodeElem.id}"]`;
  }
  const parts = [];
  while (nodeElem && nodeElem.nodeType === Node.ELEMENT_NODE) {
    let nbOfPreviousSiblings = 0;
    let hasNextSiblings = false;
    let sibling = nodeElem.previousElementSibling;
    while (sibling && sibling !== document.body) {
      if (
        sibling.nodeType !== Node.DOCUMENT_TYPE_NODE &&
        sibling.nodeName === nodeElem.nodeName
      ) {
        if (!(sibling as any).dataset.testMonster) {
          // 排除注入元素
          nbOfPreviousSiblings++;
        }
      }
      sibling = sibling.previousElementSibling;
    }
    sibling = nodeElem.nextElementSibling;
    while (sibling && sibling !== document.body) {
      if (sibling.nodeName === nodeElem.nodeName) {
        if (!(sibling as any).dataset.testMonster) {
          // 排除注入元素
          hasNextSiblings = true;
          break;
        }
      }
      sibling = sibling.nextElementSibling;
    }
    const prefix = nodeElem.prefix ? `${nodeElem.prefix}:` : '';
    const nth =
      nbOfPreviousSiblings || hasNextSiblings
        ? `[${nbOfPreviousSiblings + 1}]`
        : '';
    parts.push(prefix + nodeElem.localName + nth);
    if (nodeElem.parentNode) nodeElem = nodeElem.parentNode as Element;
  }
  let rst = parts.length ? `/${parts.reverse().join('/')}` : '';
  rst = rst
    .replace(/\/g/g, '/*[name()="g"]')
    .replace(/\/svg/g, '/*[name()="svg"]')
    .replace(/\/path/g, '/*[name()="path"]');
  return rst;
};

/**
 * 获取元素Xpath
 * @param el
 * @returns
 */
export const getXPath = (el: Element) => {
  let nodeElem = el;
  if (nodeElem.id) {
    return `//*[@id="${nodeElem.id}"]`;
  }
  const parts = [];
  while (nodeElem && nodeElem.nodeType === Node.ELEMENT_NODE) {
    let nbOfPreviousSiblings = 0;
    let hasNextSiblings = false;
    let sibling = nodeElem.previousSibling;
    while (sibling) {
      if (
        sibling.nodeType !== Node.DOCUMENT_TYPE_NODE &&
        sibling.nodeName === nodeElem.nodeName
      ) {
        nbOfPreviousSiblings++;
      }
      sibling = sibling.previousSibling;
    }
    sibling = nodeElem.nextSibling;
    while (sibling) {
      if (sibling.nodeName === nodeElem.nodeName) {
        hasNextSiblings = true;
        break;
      }
      sibling = sibling.nextSibling;
    }
    const prefix = nodeElem.prefix ? `${nodeElem.prefix}:` : '';
    const nth =
      nbOfPreviousSiblings || hasNextSiblings
        ? `[${nbOfPreviousSiblings + 1}]`
        : '';
    parts.push(prefix + nodeElem.localName + nth);
    if (nodeElem.parentNode) nodeElem = nodeElem.parentNode as Element;
  }
  return parts.length ? `/${parts.reverse().join('/')}` : '';
};

export const camelize = (str: string) => {
  return str.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    function (match: string, index: number) {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    },
  );
};

export const getStyle = (element: HTMLElement, styleName: string) => {
  if (!element || !styleName) return '';
  let name: string = camelize(styleName);
  if (name === 'float') {
    name = 'cssFloat';
  }
  try {
    const style = (element.style as any)[name];
    if (style) return style;
    const computed = document.defaultView?.getComputedStyle(element, '') || '';
    return computed ? (computed as any)[name] : '';
  } catch (e) {
    return (element.style as any)[name];
  }
};

export const isScroll = (el: HTMLElement, isVertical?: boolean) => {
  const determinedDirection = isVertical === null || isVertical === undefined;

  const overflow = determinedDirection
    ? getStyle(el, 'overflow')
    : isVertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x');
  return overflow.match(/(scroll|auto)/);
};

export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean,
): Window | HTMLElement => {
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, isVertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
};

export const getUrlParams = (url: string) => {
  // 通过 ? 分割获取后面的参数字符串
  if (!url || url.indexOf('?') === -1) return {};
  const urlStr = url.split('?')[1];
  // 创建空对象存储参数
  const obj: Record<string, string> = {};
  // 再通过 & 将每一个参数单独分割出来
  const paramsArr = urlStr.split('&');
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    // 再通过 = 将每一个参数分割为 key:value 的形式
    const arr = paramsArr[i].split('=');
    obj[arr[0]] = arr[1];
  }
  return obj;
};

export const trim = (string: string): string => {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export const hasClass = (el: HTMLElement, cls: string): boolean => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
};

export const removeClass = (el: HTMLElement, cls: string): void => {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0; i < classes.length; i += 1) {
    const clsName = classes[i];

    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/**
 * 触发事件
 * @param eventName
 * @param el
 */
interface KeyboardConfig {
  key: string;
  code: string;
  keyCode: number;
}
interface MouseEventConfig {
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
}

export type EventName =
  | 'keyup'
  | 'blur'
  | 'keydown'
  | 'focus'
  | 'input'
  | 'change'
  | 'mousedown'
  | 'click'
  | 'submit'
  | 'mouseup';

/**
 * 触发原生事件
 * @param eventName
 * @param el
 * @param config
 */
export const dispatchEventHandler = (
  eventName: EventName,
  el: Element | Document,
  config?: {
    keyboardConfig?: KeyboardConfig;
    mouseEventConfig?: MouseEventConfig;
  },
) => {
  if (el || eventName === 'keyup' || eventName === 'keydown') {
    switch (eventName) {
      case 'click': {
        const clickEvent = new Event('click', {
          cancelable: true,
          bubbles: true,
        });
        el.dispatchEvent(clickEvent);
        break;
      }
      case 'submit': {
        const clickEvent = new Event('submit', {
          cancelable: true,
          bubbles: true,
        });
        el.dispatchEvent(clickEvent);
        break;
      }
      case 'focus':
        (el as HTMLInputElement).focus();
        break;
      case 'blur': {
        (el as HTMLInputElement).blur();
        break;
      }
      case 'input':
        {
          const inputEvent = new InputEvent('input');
          el.dispatchEvent(inputEvent);
        }
        break;
      case 'change': {
        const changeEvent = new InputEvent('change');
        el.dispatchEvent(changeEvent);
        break;
      }
      case 'mousedown': {
        const mouseEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        el.dispatchEvent(mouseEvent);
        break;
      }
      case 'keyup': {
        if (config && config.keyboardConfig) {
          const keyboardEvent = new KeyboardEvent('keyup', {
            ...config.keyboardConfig,
            location: 1,
            bubbles: true,
            cancelable: true,
            composed: true,
          });
          document.body.dispatchEvent(keyboardEvent);
        }
        break;
      }

      case 'keydown': {
        if (config && config.keyboardConfig) {
          const keyboardEvent = new KeyboardEvent('keydown', {
            ...config.keyboardConfig,
            shiftKey: config.keyboardConfig.keyCode === 16,
            altKey: config.keyboardConfig.keyCode === 18,
            location: 1,
            bubbles: true,
            cancelable: true,
            composed: true,
          });
          document.body.dispatchEvent(keyboardEvent);
        }
        break;
      }

      case 'mouseup': {
        const mouseEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        el.dispatchEvent(mouseEvent);
        break;
      }
      default:
        if (config && config.mouseEventConfig) {
          const event = new MouseEvent(eventName, {
            ...config.mouseEventConfig,
            cancelable: false,
            bubbles: true,
          });
          el.dispatchEvent(event);
        } else {
          const event = new MouseEvent(eventName, {
            cancelable: false,
            bubbles: true,
          });
          el.dispatchEvent(event);
        }
    }
  }
};
/**
 * 事件监听
 * @param event
 * @param callback
 */
export const addEventListener = <T>(
  event: string,
  callback: (e: T extends Event ? Event : any) => void,
  source: Document | Window | Node = document,
) => {
  source.addEventListener(event, callback, { capture: true, passive: true });
};
/**
 * 移除事件监听
 * @param event
 * @param callback
 */
export const removeEventListener = <T>(
  event: string,
  callback: (e: T extends Event ? Event : any) => void,
  source: Document | Window | Node = document,
) => {
  source.removeEventListener(event, callback);
};

export const getAllStorage = <T>(storage: Storage): T => {
  const len = storage.length;
  const arr = [];
  for (let i = 0; i < len; i++) {
    const getKey = storage.key(i);
    if (getKey) {
      const getVal = storage.getItem(getKey);
      arr[i] = {
        key: getKey,
        val: getVal?.trim(),
      };
    }
  }
  return arr as T;
};

export const transformUrl = (url: string) => {
  const _url = new URL(url);
  return `${_url.host}`;
};
