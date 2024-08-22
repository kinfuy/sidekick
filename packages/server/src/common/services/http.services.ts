import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  constructor(private  httpService: HttpService) {}

  async get<T = any>(url: string): Promise<T> {
    const { data } = await lastValueFrom(this.httpService.get<T>(url));
    return data;
  }

  async post<T = any>(url: string, body: any): Promise<T> {
    const { data } = await lastValueFrom(this.httpService.post<T>(url, body));
    return data;
  }
}
