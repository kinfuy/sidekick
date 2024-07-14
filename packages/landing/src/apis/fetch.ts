import { storeToRefs } from 'pinia';
import { useAuth } from '@/store/useAuth';

export const baseURL = 'https://api.kinfuy.cn';
// export const baseURL = 'http://localhost:9000';

const requestInterceptors = (url: string, data: any) => {
  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
  };
  const store = useAuth();

  const { accessToken } = storeToRefs(store);

  if (accessToken.value) {
    headers.Authorization = `Bearer ${accessToken.value}`;
  }
  return {
    url: `${baseURL}${url}`,
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };
};

const responseInterceptors = async (data: Response) => {
  const { clearAuth } = useAuth();
  const rst = await data.json();
  if (rst.code === '000000') {
    return rst?.data;
  }
  if (rst.code === '100001') {
    throw new Error(rst.message);
  }
  if (rst.code === '100004') {
    clearAuth();
    throw new Error(rst.message);
  }
  throw new Error(rst.message);
};

export const myFetch = async (url: string, data: any) => {
  const { url: _url, method, headers, body } = requestInterceptors(url, data);
  const rst = await fetch(_url, { method, headers, body });
  return await responseInterceptors(rst);
};

export const request = {
  post: async <T>(url: string, data: any): Promise<T> => {
    return await myFetch(url, data);
  },
  get: async <T>(url: string, data: any): Promise<T> => {
    return await myFetch(url, data);
  },
};
