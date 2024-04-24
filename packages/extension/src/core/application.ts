import { apps } from '../applications';
import { useCoreStore } from './store';
import { PreCoreApp, SuffixCoreApp } from './core-app';
import type { Application, ApplicationHook } from '@/types/core-app.type';

/**
 * 获取所有app hook name 的钩子
 * @param name
 * @param isActived 仅获取激活状态
 * @param limitApp 仅获取此apps hooks
 * @returns
 */
export const getApplicationHooks = async (
  name: string,
  isActived: boolean,
  limitApp?: Array<string>,
): Promise<ApplicationHook[]> => {
  const applicationHook: ApplicationHook[] = [];
  const { isAppActive } = useCoreStore();

  apps
    .filter((a) => (limitApp ? limitApp.includes(a.name) : true))
    .forEach((app) => {
      const active = isActived ? isAppActive(app.name) : true;
      if (app.hooks[name] && active) {
        applicationHook.push(app.hooks[name]);
      }
    });
  return applicationHook;
};

export const runCoreHook = async (
  name: string,
  app: () => Application,
  options: any,
) => {
  const core = app();
  const coreHooks = core[name];
  if (coreHooks) {
    await coreHooks(options);
  }
};
/**
 * 触发应用钩子
 * @param name
 * @param options
 * @param limitApp 仅触发apps 钩子
 */
export const triggerApplicationHooks = async (
  name: string,
  options?: any,
  limitApp?: string[],
) => {
  await runCoreHook(name, PreCoreApp, options);
  const actived = name !== 'onActiveChange';
  const hooks = await getApplicationHooks(name, actived, limitApp);
  for (const hook of hooks) {
    await hook(options);
  }
  await runCoreHook(name, SuffixCoreApp, options);
};
