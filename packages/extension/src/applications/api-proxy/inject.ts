import { Message } from '@core/message';
import { useInjectStore } from './content/inejct-store';
import { createXHRProxy, fetchHook } from './content/mock';
import type {
  AfterFetchResponse,
  AfterXmlResponse,
  BeforeFetchRequest,
  BeforeXmlOpen,
  BeforeXmlResponse,
  BeforeXmlSend,
  FetchHooks,
  OpenBody,
  XMLHttpHooks,
} from './content/mock';
import type { ProxyRule } from './store';

const originXML = window.XMLHttpRequest;
const originFetch = window.fetch;

const {
  isProxy,
  isMock,
  isCatch,
  setIsCatch,
  updateRecord,
  setEffectiveRules,
  clearRecord,
} = useInjectStore();

const getMethedUrl = (openContent: OpenBody | undefined) => {
  if (openContent) {
    const url =
      typeof openContent.url === 'string'
        ? openContent.url
        : openContent.url.href;
    const method = openContent.method;
    return { url, method };
  }
  return {
    url: '',
    method: '',
  };
};

const findMatchingRule = (url: string): ProxyRule | undefined => {
  const { effectiveRules } = useInjectStore();
  return effectiveRules.value.find((rule) => {
    if (rule.match.matchType === 'regex') {
      try {
        const regex = new RegExp(rule.match.value);
        return regex.test(url);
      } catch (e) {
        return false;
      }
    } else if (rule.match.matchType === 'equals') {
      return url === rule.match.value;
    } else {
      return url.includes(rule.match.value);
    }
  });
};

const createXmlHooks = (): XMLHttpHooks => {
  const beforeXmlOpen: BeforeXmlOpen = (body, context) => {
    if (isProxy.value) {
      const url = typeof body.url === 'string' ? body.url : body.url.href;
      const method = body.method;
      const rule = findMatchingRule(url);
      if (isMock.value) {
        console.log('beforeXmlOpen', body, context, rule);
      }
      if (isCatch.value) {
        updateRecord({
          url,
          method,
        });
      }
      return body;
    }
    return body;
  };

  const beforeXmlSend: BeforeXmlSend = (body, context) => {
    if (isProxy.value) {
      if (isCatch.value) {
        const { url, method } = getMethedUrl(context.openContent);
        if (url && method) {
          updateRecord({
            url,
            method,
            request: {
              headers: context.requestHeaders,
              body,
            },
          });
        }
      }
    }
    return body;
  };

  const beforeXmlResponse: BeforeXmlResponse = (content, context) => {
    if (isProxy.value) {
      if (isMock.value) {
        console.log('beforeXmlResponse', content);
      }
      if (isCatch.value) {
        const { url, method } = getMethedUrl(context.openContent);
        if (url && method) {
          const headerLines = content.headers.split('\n');
          const headersObj: Record<string, string> = {};

          headerLines.forEach((line) => {
            const [name, value] = line.split(': ').map((s) => s.trim());
            if (name && value) {
              headersObj[name.toLowerCase()] = value;
            }
          });
          updateRecord({
            url,
            method,
            response: {
              headers: headersObj,
              body: content.response,
            },
          });
        }
      }
    }
    return content;
  };

  const afterXmlResponse: AfterXmlResponse = (body) => {
    return body;
  };

  return {
    beforeXmlOpen,
    beforeXmlSend,
    beforeXmlResponse,
    afterXmlResponse,
  };
};

const createFetchHooks = (): FetchHooks => {
  const beforeFetchRequest: BeforeFetchRequest = async (body, _context) => {
    if (isProxy.value) {
      // console.log('beforeFetchRequest', body, context);
    }
    return body;
  };

  const afterFetchResponse: AfterFetchResponse = async (body, _context) => {
    if (isProxy.value) {
      // console.log('afterFetchResponse', body, context);
    }
    return body;
  };

  return {
    beforeFetchRequest,
    afterFetchResponse,
  };
};

const initProxy = (xmlHooks: XMLHttpHooks, fetchHooks: FetchHooks) => {
  const selfFetchproxy = fetchHook({
    originFetch,
    ...fetchHooks,
  });

  const XHRProxy = createXHRProxy(originXML, xmlHooks);

  if (!(window.XMLHttpRequest as any)?.isApiProxy) {
    window.XMLHttpRequest = XHRProxy;
    window.fetch = selfFetchproxy;
    console.log('ApiProxy', 'initProxy');
  }
};

export const mock = () => {
  const xmlHooks = createXmlHooks();
  const fetchHooks = createFetchHooks();
  initProxy(xmlHooks, fetchHooks);
};

mock();

window.addEventListener('message', (event) => {
  if (event.data.from === Message.Form.CONTENT_MESSAGE) {
    const { code, data } = event.data;
    console.log('inject', event.data);
    if (code === 'ApiProxy') {
      if (data.key === 'init_rules') {
        const { rules, isCatch } = data.data;
        setIsCatch(isCatch);
        setEffectiveRules(rules);
      }

      if (data.key === 'clear_record') {
        clearRecord();
      }
    }
  }
});

export {};
