/**
 * Mock规则接口定义
 */
export interface MockRule {
  /** 规则ID */
  id: number;
  /** 规则优先级 */
  priority: number;
  /** 是否有效 */
  isActive: boolean;
  /** 规则匹配条件 */
  condition: {
    /** 匹配类型 */
    matchType: 'include' | 'equal' | 'regex';
    /** URL匹配模式 */
    urlFilter: string;
    /** 资源类型 */
    resourceTypes: chrome.declarativeNetRequest.ResourceType[];
  };
  /** 规则动作 */
  action: {
    /** 动作类型 */
    type: 'redirect' | 'modify';

    /** 重定向配置 */
    redirect?: {
      /** 重定向目标URL */
      url: string;
    };
    /** 请求头修改配置 */
    requestHeaders?: {
      /** 头部名称 */
      header: string;
      /** 操作类型 */
      operation: 'set' | 'remove' | 'append';
      /** 头部值 */
      value: string;
    }[];
    /** 请求体修改配置 */
    requestBody?: Record<string, any>;
    /** 响应头修改配置 */
    responseHeaders?: {
      /** 头部名称 */
      header: string;
      /** 操作类型 */
      operation: 'set' | 'remove' | 'append';
      /** 头部值 */
      value: string;
    }[];
    /** 响应体修改配置 */
    responseBody?: any;
  };
}

export namespace Mock {
  /**
   * 初始化服务,清除现有规则
   */
  export const initializeService = async () => {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRules.map((rule) => rule.id),
    });
  };

  /**
   * 添加 Chrome API 规则
   */
  export const addRule = async (rule: chrome.declarativeNetRequest.Rule) => {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [rule],
    });
  };

  /**
   * 移除规则
   */
  export const removeRule = async (ruleId: number) => {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [ruleId],
    });
  };

  /**
   * 批量清除规则
   */
  export const clearRules = async (ids: number[]) => {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ids,
    });
  };
}
