import { dispatchEventHandler, getElementByXpath } from '@utils';
import type { LoginMatchRule, MatchRule, WebUser } from './store';

export const elementCssSelector = (css: string[]): HTMLElement | null => {
  let el = null;
  for (let i = 0; i < css.length; i++) {
    try {
      el = document.body.querySelector(css[i]) as HTMLElement;
    } catch (error) {}
    if (el) break;
  }
  return el;
};

export const elementXPath = (xpath: string[]) => {
  let el = null;
  for (let i = 0; i < xpath.length; i++) {
    try {
      el = getElementByXpath(xpath[i]) as HTMLElement;
    } catch (error) {}
    if (el) break;
  }
  return el;
};

export const elementPlaceholder = (placeholder: string[]) => {
  let el = null;
  for (let i = 0; i < placeholder.length; i++) {
    try {
      el = document.querySelector(
        `input[placeholder*="${placeholder[i]}"]`,
      ) as HTMLElement;
    } catch (error) {}
    if (el) break;
  }
  return el;
};
/**
 * 获取元素
 * @param config
 * @returns
 */
export const getElement = <T>(config: MatchRule): T | null => {
  let el = null;
  if (config.cssSeletor) {
    el = elementCssSelector(config.cssSeletor);
  }
  if (!el && config.placeholder) {
    el = elementPlaceholder(config.placeholder);
  }
  if (!el && config.xpath) {
    el = elementXPath(config.xpath);
  }
  return el as T;
};

export const autoInput = (userInfo: {
  user: WebUser;
  rules: LoginMatchRule;
  options: {
    autoLogin: boolean;
    code: string;
  };
}) => {
  const { account, password, validate, loginBtn } = userInfo.rules;
  const { autoLogin, code } = userInfo.options;
  const userEl = getElement<HTMLInputElement>(account);
  const passWordEl = <HTMLInputElement>getElement(password);
  const validateEl = <HTMLInputElement>getElement(validate);
  const loginEle = <HTMLElement>getElement(loginBtn);

  if (userEl && passWordEl) {
    dispatchEventHandler('focus', userEl);
    userEl.value = userInfo.user.name;
    dispatchEventHandler('input', userEl, {
      data: userInfo.user.name,
    });

    dispatchEventHandler('change', userEl, {
      data: userInfo.user.name,
    });
    dispatchEventHandler('blur', userEl);

    dispatchEventHandler('focus', passWordEl);
    passWordEl.value = userInfo.user.password;
    dispatchEventHandler('input', passWordEl, {
      data: userInfo.user.password,
    });

    dispatchEventHandler('change', passWordEl, {
      data: userInfo.user.password,
    });
    dispatchEventHandler('blur', passWordEl);

    if (validateEl) {
      // 获取到验证码元素，尝试填充
      validateEl.value = code || '';
      dispatchEventHandler('input', validateEl);
    }
    setTimeout(() => {
      if (autoLogin && loginEle) {
        dispatchEventHandler('mousedown', loginEle);
        dispatchEventHandler('mouseup', loginEle);
        dispatchEventHandler('click', loginEle);
        if ((loginEle as HTMLButtonElement)?.type === 'submit') {
          const formEl = loginEle.closest('form');
          if (formEl) {
            dispatchEventHandler('submit', formEl);
          }
        }
      }
    }, 0);
  }
};
