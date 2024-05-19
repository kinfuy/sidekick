import type { WebInfo, WebUser } from './store';
import { autoInput } from './utils';

export const devAccount = (data: { web: WebInfo; user: WebUser }) => {
  const { web, user } = data;
  autoInput({
    user,
    rules: web.match,
    options: {
      code: web.code,
      autoLogin: web.autoLogin,
    },
  });
};
