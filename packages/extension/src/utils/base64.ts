export const encodeToBase64 = (str: string) =>
  btoa(unescape(encodeURIComponent(str)));
