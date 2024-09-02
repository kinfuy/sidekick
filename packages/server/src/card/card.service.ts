import { Injectable } from '@nestjs/common';
import { CardTemplate } from './card.interface';

@Injectable()
export class CardService {
  getCardList(): CardTemplate[] {
    return [
      {
        themeColor: '#333333',
        logo: 'github',
        unit: 'Followers',
        desc: 'Github Followers',
        query: true,
      },
      {
        themeColor: '#1e80ff',
        logo: 'juejin',
        unit: '关注',
        desc: '掘金关注',
        query: true,
      },
      {
        themeColor: '#d62629',
        logo: 'weibo',
        unit: '粉丝',
        desc: '微博粉丝',
        query: true,
      },
      {
        themeColor: '#f16c8c',
        logo: 'bilibili',
        unit: '粉丝',
        desc: 'bilibili粉丝',
        query: true,
      },
      // {
      //   themeColor: '#00a1d6',
      //   logo: 'jianshu',
      //   unit: '关注',
      //   desc: '简书关注',
      //   query: false,
      // },
      // {
      //   themeColor: '#00a1d6',
      //   logo: 'zhihu',
      //   unit: '关注',
      //   desc: '知乎关注',
      //   query: false,
      // },
      // {
      //   themeColor: '#00a1d6',
      //   logo: 'douban',
      //   unit: '关注',
      //   desc: '豆瓣关注',
      //   query: false,
      // },
      // {
      //   themeColor: '#00a1d6',
      //   logo: 'douyin',
      //   unit: '关注',
      //   desc: '抖音关注',
      //   query: false,
      // },
      // {
      //   themeColor: '#00a1d6',
      //   logo: 'kuaishou',
      //   unit: '关注',
      //   desc: '快手关注',
      //   query: false,
      // },
      // {
      //   themeColor: '#00a1d6',
      //   logo: 'toutiao',
      //   unit: '关注',
      //   desc: '头条关注',
      //   query: false,
      // },
    ];
  }
}
