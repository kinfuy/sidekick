export interface DevAccountStoreInstance {}

export interface WebEnv {
  name: string;
  alias?: string;
  url: string;
}

export interface WebUser {
  name: string;
  password: string;
  role?: string;
  remark?: string;
}
export interface WebInfo {
  name: string;
  envs: WebEnv[];
  users: WebUser[];
}
