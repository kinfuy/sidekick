import request from './axios';

export const loginApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/login`, data);
};

export const registerApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/register`, data);
};

export const sendCodeApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/verifyCode`, data);
};

export const verifyEmailApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/verifyEmail`, data);
};

export const activationVipApi = async <T>(data: object): Promise<T> => {
  return await request.post(`/user/activationVip`, data);
};
