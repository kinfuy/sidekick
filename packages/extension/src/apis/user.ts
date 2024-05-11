import axios from './axios';

export const loginApi = async <T>(data: object): Promise<T> => {
  return await axios.post(`/login`, data);
};

export const registerApi = async <T>(data: object): Promise<T> => {
  return await axios.post(`/register`, data);
};

export const sendCodeApi = async <T>(data: object): Promise<T> => {
  return await axios.post(`/verifyCode`, data);
};

export const verifyEmailApi = async <T>(data: object): Promise<T> => {
  return await axios.post(`/verifyEmail`, data);
};

export const activationVipApi = async <T>(data: object): Promise<T> => {
  return await axios.post(`/user/activationVip`, data);
};
