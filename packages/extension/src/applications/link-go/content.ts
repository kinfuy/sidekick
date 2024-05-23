// content
export const parseUrl = (url: string, filed: string | RegExp) => {
  if (typeof filed === 'string' && url) {
    const urlObject = new URL(url);
    const urlParamRes = urlObject.searchParams.get(filed);
    return urlParamRes;
  }
  const match = url.match(filed);
  if (match?.groups && match.groups.target) return match?.groups.target;
  return null;
};

export const linkGo = (url: string) => {
  const href =
    parseUrl(url, 'target') ||
    parseUrl(url, 'url') ||
    parseUrl(url, /transfer\?(?<target>.+)/); // https://blog.51cto.com/
  if (href) window.location.href = new URL(href).href;
};
