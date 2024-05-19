import type { LoginMatchRule } from './store';
export const defaultMatchRule: LoginMatchRule = {
  account: {
    xpath: [],
    placeholder: ['手机', '用户', '账户', '登陆名', '账号'],
    cssSeletor: [],
  },
  password: {
    xpath: [],
    placeholder: ['密码'],
    cssSeletor: [],
  },
  loginBtn: {
    xpath: [],
    placeholder: [],
    cssSeletor: ['.login-btn'],
  },
  validate: {
    xpath: [],
    placeholder: ['验证码'],
    cssSeletor: [],
  },
};
