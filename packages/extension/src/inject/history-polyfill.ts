function wrapHistoryMethod<T extends keyof History>(
  type: T,
  history: History,
): (...args: Parameters<History[T]>) => ReturnType<History[T]> {
  // 获取原始的方法
  const originalMethod = history[type] as (
    ...args: Parameters<History[T]>
  ) => ReturnType<History[T]>;

  // 创建一个新的事件
  const event = new CustomEvent(type, {
    detail: {
      // TypeScript 中 Event 不直接支持 arguments 属性，因此我们使用 detail 来传递参数
      arguments: [] as unknown as Parameters<History[T]>,
    },
    bubbles: true,
    cancelable: true,
  });

  // 返回一个封装后的函数
  return function (...args: Parameters<History[T]>): ReturnType<History[T]> {
    // 调用原始方法并保存返回值
    const result = originalMethod.apply(history, args);

    // 更新事件中的参数
    (event.detail as { arguments: Parameters<History[T]> }).arguments = args;

    // 分发事件
    window.dispatchEvent(event);

    // 返回原始方法的调用结果
    return result;
  };
}

export function enhanceHistory() {
  if ((history as any).__sidekick__) {
    return;
  }
  if ('pushState' in history) {
    history.pushState = wrapHistoryMethod('pushState', history);
  }
  if ('replaceState' in history) {
    history.replaceState = wrapHistoryMethod('replaceState', history);
  }
  (history as any).__sidekick__ = true;
}
