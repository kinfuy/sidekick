import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserException } from '@/common/exceptions/custom.exception';
@Injectable()
export class DataService {
  constructor(private readonly httpService: HttpService) {}
  async getGihubUser(name: string) {
    const res = this.httpService.get(`https://api.github.com/users/${name}`);
    const data = await lastValueFrom(res);
    return data.data;
  }

  async getJuejinUser(user_id: string) {
    const res = this.httpService.get(
      `https://api.juejin.cn/user_api/v1/user/get?user_id=${user_id}`,
    );
    const data = await lastValueFrom(res);
    return data.data;
  }

  async getJuejinUser2(nickname: string) {
    const res = this.httpService.get(
      `https://api.juejin.cn/search_api/v1/search?query=${nickname}&id_type=1&search_type=0&limit=10`,
    );
    const data = await lastValueFrom(res);
    try {
      const user = data.data.data.find((item) => item.result_model.user_name === nickname);
      if (!user) throw new UserException(`用户不存在${user}`);
      return user.result_model;
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }
}
