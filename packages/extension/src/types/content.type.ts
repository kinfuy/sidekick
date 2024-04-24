import type { MagicApp } from './inject.type';

export interface BaichuanOptions {
  reload?: boolean | string[];
  inject?: any;
  apps?: MagicApp[];
  cookies?: any;
}
export interface BaichuanCore {
  key: string;
  data: BaichuanOptions;
}
