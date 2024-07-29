export const getPropByPath = (obj: any, path: string) => {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;

  for (let len = keyArr.length; i < len - 1; ++i) {
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error(
        '[iView warn]: please transfer a valid prop path to form item!',
      );
    }
  }
  return tempObj[keyArr[i]];
};
