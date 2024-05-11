import type { AxiosInstance } from 'axios';
import axios from 'axios';

export interface ResponseOption {
  status: number;
  message: string;
  data: string | number | object | Array<any>;
}

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 10000,
});

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

axios.interceptors.response.use(
  (response) => {
    debugger;
    if (response.data.code === '000000') {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
