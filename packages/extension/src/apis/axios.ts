import { useAuth } from '@store/useAuth';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

// export const baseURL = 'https://api.kinfuy.cn';
export const baseURL = 'http://localhost:9000';

export interface ResponseOption {
  status: number;
  message: string;
  data: string | number | object | Array<any>;
}

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 60000,
});

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

// 请求拦截器
instance.interceptors.request.use(
  (request) => {
    const { accessToken } = useAuth();
    if (accessToken.value) {
      request.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === '000000') {
      return Promise.resolve(response.data.data);
    }
    if (response.data.code === '100004') {
      // 未登录
      // const { clearAuth } = useAuth();
      // clearAuth();
      return Promise.reject(response.data.message);
    }

    return Promise.reject(Error(response.data.message));
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
