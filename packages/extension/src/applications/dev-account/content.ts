import { useContentAction } from '@store/useContentAction';
import { transformUrl } from '@utils';
import { type WebInfo, type WebUser, useDevAccountStore } from './store';
import { autoInput, getElement } from './utils';
const userLogin = (user: WebUser, web: WebInfo) => {
  autoInput({
    user,
    rules: web.match,
    options: {
      code: web.code,
      autoLogin: web.autoLogin,
    },
  });
};

export const devAccount = async (option: {
  key: string;
  data: { web: WebInfo; user?: WebUser };
}) => {
  const { key } = option;
  if (key === 'user-login') {
    const { web, user } = option.data;
    if (!user) return;
    userLogin(user, web);
  }
  if (key === 'register-shotcut') {
    const { getMatch } = useDevAccountStore();
    const match = await getMatch(window.location.href);
    if (!match) return;
    const loginBtn = getElement<HTMLElement>(match.match.loginBtn);
    const { add, remove } = useContentAction();
    if (!loginBtn) {
      remove(transformUrl(window.location.href), 'auto-login');
      return;
    }
    add(transformUrl(window.location.href), {
      title: '自动登录',
      code: 'DevAccount',
      key: 'auto-login',
    });
  }
  if (key === 'auto-login') {
    const { getMatch } = useDevAccountStore();
    const match = await getMatch(window.location.href);
    if (!match) return;
    const defaultUser = match.users.find((u) => u.isDefault);
    if (!defaultUser) return;
    autoInput({
      user: defaultUser,
      rules: match.match,
      options: {
        code: match.code,
        autoLogin: true,
      },
    });
  }
};
