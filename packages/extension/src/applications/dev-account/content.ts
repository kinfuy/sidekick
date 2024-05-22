import { type WebInfo, type WebUser } from './store';
import { autoInput } from './utils';

export const devAccount = (option: {
  key: string;
  data: { web: WebInfo; user?: WebUser };
}) => {
  const { key } = option;
  const { web, user } = option.data;
  if (key === 'user-login' && user) {
    autoInput({
      user,
      rules: web.match,
      options: {
        code: web.code,
        autoLogin: web.autoLogin,
      },
    });
  }
};
