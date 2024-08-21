import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserException } from '@/common/exceptions/custom.exception';
import { Follower, Icon } from './data.interface';
import { DataDto } from './dto/data.dto';
@Injectable()
export class DataService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 根据name 获取github 信息
   * @param name
   * @returns
   */
  async getGihubUser(name: string): Promise<Follower> {
    const res = this.httpService.get(`https://api.github.com/users/${name}`);

    try {
      const data = await lastValueFrom(res);
      const {
        followers,
        login: username,
        name: nickname,
        avatar_url,
      } = data.data;
      return { followers, username, nickname, avatar_url };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }

  // async getJuejinUser2(user_id: string): Promise<SocialCardResponse> {
  //   const res = this.httpService.get(
  //     `https://api.juejin.cn/user_api/v1/user/get?user_id=${user_id}`,
  //   );
  // try {
  //   const data = await lastValueFrom(res);
  //   const {
  //     follower_count: followers,
  //     user_name: nickname,
  //     avatar_large: avatar_url,
  //   } = data.data.data;
  //   return { followers, username: '', nickname, avatar_url };
  // } catch (error) {
  //   throw new UserException('用户不存在');
  // }
  // }

  async getJuejinUser(name: string) {
    const res = this.httpService.get(
      `https://api.juejin.cn/search_api/v1/search?query=${name}&id_type=1&search_type=0&limit=10`,
    );
    const data = await lastValueFrom(res);
    try {
      const user = data.data.data.find(
        (item) => item.result_model.user_name === name,
      );
      if (!user) throw new UserException(`用户不存在${user}`);
      const {
        follower_count: followers,
        user_name: nickname,
        avatar_large: avatar_url,
      } = user.result_model;
      return { followers, username: '', nickname, avatar_url };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }

  private async getWeiboUser(name: string) {
    const url = encodeURI(`https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D3%26q%3D${name}%26t%3D&page_type=searchall`)
    const res = this.httpService.get(url);
    const data = await lastValueFrom(res);
    try {
      const userGroup = data.data.data.cards[1].card_group;
      const userInfo = userGroup.find((item) =>
        item.user.screen_name.includes(name),
      );
      if (!userInfo) throw new UserException(`用户不存在${userInfo}`);
      const user = userInfo.user;
      if (!user) throw new UserException(`用户不存在${user}`);
      const {
        followers_count: followers,
        screen_name: nickname,
        profile_image_url: avatar_url,
      } = user;
      return { followers: Number(followers), username: '', nickname, avatar_url };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }

  async getIcons() {
    const icons = [];
    return icons;
  }

  async getFollowers(param: DataDto) {
    const { type, data } = param;
    if (type === 'juejin') {
      return this.getJuejinUser(data);
    }
    if (type === 'github') {
      return this.getGihubUser(data);
    }
    if (type === 'weibo') {
      return this.getWeiboUser(data);
    }
  }
}

