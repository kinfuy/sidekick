import blueimpMd5 from 'blueimp-md5';
export const encodeToBase64 = (str: string) =>
  btoa(unescape(encodeURIComponent(str)));

export const md5 = (str: string) => {
  return blueimpMd5(str);
};
