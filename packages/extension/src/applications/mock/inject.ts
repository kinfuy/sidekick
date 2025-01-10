import { createXHRProxy, fetchHook } from './content/mock';
import type {
  AfterFetchResponse,
  AfterXmlResponse,
  BeforeFetchRequest,
  BeforeXmlOpen,
  BeforeXmlResponse,
  BeforeXmlSend,
  FetchHooks,
  XMLHttpHooks,
} from './content/mock';

const originXML = window.XMLHttpRequest;
const originFetch = window.fetch;

const createXmlHooks = (): XMLHttpHooks => {
  const beforeXmlOpen: BeforeXmlOpen = (body, conetnt) => {
    console.log('beforeXmlOpen', body, conetnt);
    return body;
  };
  const beforeXmlSend: BeforeXmlSend = (body, conetnt) => {
    console.log('beforeXmlSend', body, conetnt);
    return body;
  };
  const beforeXmlResponse: BeforeXmlResponse = (content) => {
    console.log('beforeXmlResponse', content);
    return content;
  };
  const afterXmlResponse: AfterXmlResponse = (body, context) => {
    console.log('afterXmlResponse', body, context);
  };

  return {
    beforeXmlOpen,
    beforeXmlSend,
    beforeXmlResponse,
    afterXmlResponse,
  };
};

const createFetchHooks = (): FetchHooks => {
  const beforeFetchRequest: BeforeFetchRequest = (body, context) => {
    console.log('beforeFetchRequest', body, context);
    return Promise.resolve(body);
  };
  const afterFetchResponse: AfterFetchResponse = (body, context) => {
    console.log('afterFetchResponse', body, context);
    // const response = replaceFetchDate(body);
    return Promise.resolve(body);
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

  if (!(window.XMLHttpRequest as any)?.isMock) {
    window.XMLHttpRequest = XHRProxy;
    window.fetch = selfFetchproxy;
    console.log('Mock', 'initProxy');
  }
};

export const mock = () => {
  const xmlHooks = createXmlHooks();
  const fetchHooks = createFetchHooks();
  initProxy(xmlHooks, fetchHooks);
};

mock();

export {};
