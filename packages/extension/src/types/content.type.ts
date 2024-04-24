export interface BaichuanOptions {
  reload?: boolean | string[];
  inject?: any;
  cookies?: any;
}
export interface BaichuanCore {
  key: string;
  data: BaichuanOptions;
}
