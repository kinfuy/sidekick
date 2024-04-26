export interface ContentOptions {
  reload?: boolean | string[];
  inject?: any;
  cookies?: any;
}
export interface ContentCore {
  key: string;
  data: ContentOptions;
}

export interface PostMessage {
  key: string;
  from: string;
  code: string;
  data?: Record<string, any>;
}
