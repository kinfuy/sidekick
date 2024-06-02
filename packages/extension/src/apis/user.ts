import { useAuth } from '@store/useAuth';
import request, { baseURL } from './axios';
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
  const { accessToken } = useAuth();
  const rst = await fetch(`${baseURL}/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify(data),
  });
  return await rst.json();
};
