import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  private defaultHeaders = {
    'Content-Type': 'application/json',
  };
  constructor(private httpService: HttpService) {}

  async get<T = any>(url: string, param?: any, headers?: any): Promise<T> {
    const u = param ? `${url}?${new URLSearchParams(param)}` : url;
    const { data } = await lastValueFrom(
      this.httpService.get<T>(u, {
        headers: Object.assign(this.defaultHeaders, (headers = {})),
      }),
    );
    return data;
  }

  async getCatchAll<T = any>(
    url: string,
    param?: any,
    headers?: any,
  ): Promise<any> {
    const u = param ? `${url}?${new URLSearchParams(param)}` : url;
    const res = await lastValueFrom(
      this.httpService.get<T>(u, {
        headers: Object.assign(this.defaultHeaders, (headers = {})),
      }),
    );
    return res;
  }

  async postQuery<T = any>(
    url: string,
    param?: any,
    headers?: any,
  ): Promise<T> {
    const u = param ? `${url}?${new URLSearchParams(param)}` : url;
    const { data } = await lastValueFrom(
      this.httpService.post<T>(u, undefined, {
        headers: Object.assign(this.defaultHeaders, (headers = {})),
      }),
    );
    return data;
  }

  async post<T = any>(url: string, param?: any, headers?: any): Promise<T> {
    const { data } = await lastValueFrom(
      this.httpService.post<T>(url, param, {
        headers: Object.assign(this.defaultHeaders, (headers = {})),
      }),
    );
    return data;
  }
}
