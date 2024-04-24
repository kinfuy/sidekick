import type { PostMessage } from './chrome';

/**
 * 获取元素
 * @param key
 * @param elementConfig
 * @returns
 */
export const IsurlExait = (url: string, keys: Array<string>) => {
  let isExist = false;
  keys.forEach((val) => {
    if (url.includes(val)) {
      isExist = true;
    }
  });
  return isExist;
};

// 生成随机码
export const createRandomCode = (len = 6) => {
  const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
  const maxLen = charset.length;
  let ret = '';
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * maxLen);
    ret += charset[randomIndex];
  }
  return ret;
};

// 生成下载文件
export const loadFile = (fileName: string, content: string) => {
  const aLink = document.createElement('a');
  const blob = new Blob([content], {
    type: 'text/plain',
  });
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  URL.revokeObjectURL(blob.toString());
};

export const clearAllCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = `${keys[i]}=0;expires=${new Date(
        0,
      ).toUTCString()};max-age=0`;
    }
  }
};

/**
 * img to base64
 * @param img
 * @returns
 */
export function image2Base64(img: any) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }
}

/**
 * 等待几秒
 * @param time
 * @returns
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const tirmer = setTimeout(() => {
        resolve();
        clearTimeout(tirmer);
      }, time);
    } catch (error) {
      reject(error);
    }
  });
};

// 监听元素变动
export const mutationObserver = (
  target: Element,
  callback: MutationCallback,
) => {
  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(target, config);
  return observer;
};

/**
 * 枚举数组值转显示
 * @param value 枚举id值
 * @param source 数据源，目前限定 {value,label} 为item的数据源
 */
export function getEnumDisplay(
  value: string,
  source: Array<Record<string, string>>,
  option = { value: 'key', label: 'value' },
) {
  if (
    value !== null &&
    value !== undefined &&
    source &&
    Array.isArray(source)
  ) {
    const s = source.find(
      (x) => x[option.value].toString() === value.toString(),
    );
    return s ? s[option.label] : value;
  }
  return value;
}

export const typeOf = (obj: any): string => {
  const { toString } = Object.prototype;
  const map: { [key: string]: string } = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
};

export function isMac() {
  const agent = navigator.userAgent.toLowerCase();
  return /macintosh|mac os x/i.test(agent);
}

export const uuid = (): string => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};

/**
 * 版本号比较 version1>version2
 * @param version1
 * @param version2
 * @returns
 */
export const compareVersion = (version1: string, version2: string) => {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');
  const length1 = arr1.length;
  const length2 = arr2.length;
  const minlength = Math.min(length1, length2);
  let i = 0;
  for (i; i < minlength; i++) {
    const a = parseInt(arr1[i]);
    const b = parseInt(arr2[i]);
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
  }
  if (length1 > length2) {
    for (let j = i; j < length1; j++) {
      if (parseInt(arr1[j]) !== 0) {
        return 1;
      }
    }
    return 0;
  } else if (length1 < length2) {
    for (let j = i; j < length2; j++) {
      if (parseInt(arr2[j]) !== 0) {
        return -1;
      }
    }
    return 0;
  }
  return 0;
};

export const isNotEmpty = (val: any) => {
  if (val !== undefined && val !== null) return true;
  return false;
};

export const injectPostMessage = (data: PostMessage) => {
  window.postMessage(data, '*');
};
