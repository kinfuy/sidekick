import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import blueimpMd5 from 'blueimp-md5';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const encodeToBase64 = (str: string) =>
  btoa(unescape(encodeURIComponent(str)));

export const md5 = (str: string) => {
  return blueimpMd5(str);
};
