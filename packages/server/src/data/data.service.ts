import { Injectable } from '@nestjs/common';
import { UserException } from '@/common/exceptions/custom.exception';
import { Follower } from './data.interface';
import { DataDto } from './dto/data.dto';
import { toNumber } from '@/utils/unit.transform';
import { AxiosService } from '@/common/services/http.services';
@Injectable()
export class DataService {
  constructor(private axiosService: AxiosService) {}


  /**
   * 根据name 获取github 信息
   * @param name
   * @returns
   */
  async getGihubUser(name: string): Promise<Follower> {
    try {
      const res = await this.axiosService.get(
        `https://api.github.com/users/${name}`,
      );
      const { followers, login: username, name: nickname, avatar_url } = res;
      return { followers, username, nickname, avatar_url };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }

  async getJuejinUser(name: string) {
    try {
      const res = await this.axiosService.get(
        `https://api.juejin.cn/search_api/v1/search?query=${name}&id_type=1&search_type=0&limit=10`,
      );
      const user = res.data.find(
        (item) => item.result_model.user_name.includes(name),
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
    try {
      const url = encodeURI(
        `https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D3%26q%3D${name}%26t%3D&page_type=searchall`,
      );
      const res = await this.axiosService.get(url);
      const userGroup = res.data.cards[1].card_group;
      const userInfo = userGroup.find((item) =>
        item.user.screen_name.includes(name),
      );
      if (!userInfo?.user) throw new UserException(`用户不存在${userInfo}`);
      const {
        followers_count: followers,
        screen_name: nickname,
        profile_image_url: avatar_url,
      } = userInfo.user;
      return {
        followers: toNumber(followers),
        username: '',
        nickname,
        avatar_url,
      };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }


  private async getBilibiliUser(name: string) {
    try {
      const url = `https://api.bilibili.com/x/web-interface/search/type`;
      const cookies = await this.axiosService.getCookies('https://bilibili.com');
      const res = await this.axiosService.get(
        url,
        {
          search_type: 'bili_user',
          keyword: name,
          page: 1,
          page_size: 36,
        },
        {
          Cookie: cookies,
        },
      );

      const { result } = res?.data;
      if (!result) {
        throw new UserException('用户不存在');
      }

      const user = result?.find((item) => item.uname.includes(name));
      const { fans, uname, upic } = user;

      return {
        followers: fans,
        username: '',
        nickname: uname,
        avatar_url: `https:${upic}`,
      };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }

  // TODO 未完成
  private async getJianShuUser(name: string) {
    try {
      const url = `https://www.jianshu.com/search/do`;
      const res = await this.axiosService.postQuery(
        url,
        {
          q: name,
          type: 'user',
          page: 1,
          order_by: 'default',
        },
      );
      const user = res?.entries?.find((item) => item.nickname.includes(name));
      if (!user) {
        throw new UserException('用户不存在');
      }
      const { followers_count, nickname, avatar_url } = user;

      return {
        followers: followers_count,
        username: '',
        nickname: nickname,
        avatar_url: avatar_url,
      };
    } catch (error) {
      throw new UserException('用户不存在');
    }
  }

  // TODO 未完成
  async getDouyinUser(name: string) {
    try {
      const cookies = await this.axiosService.getCookies('https://www.douyin.com');
      const res = await this.axiosService.get(
        `https://www.douyin.com/user/aweme`,
        {
          user_id: name,
        },
        {
          Cookie: cookies,
        },
      );
      const user = res.data.user;
      if (!user) throw new UserException('用户不存在');
      const { followers_count: followers, nickname, avatar_url } = user;
      return {
        followers,
        username: '',
        nickname,
        avatar_url,
      };
    } catch (error) {
      throw new UserException('用户不存在');
    }
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
    if (type === 'bilibili') {
      return this.getBilibiliUser(data);
    }
    if (type === 'jianshu') {
      return this.getJianShuUser(data);
    }
    if (type === 'douyin') {
      return this.getDouyinUser(data);
    }
    throw new UserException('用户不存在');
  }
}
