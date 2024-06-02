import { request } from './fetch';
export const loginApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/login`, data);
};

export const registerApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/register`, data);
};

export const sendCodeApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/sendCode`, data);
};

export const verifyEmailApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/verifyEmail`, data);
};

export const activationVipApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/user/activationVip`, data);
};

export const refreshTokenApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/refreshToken`, data);
};
