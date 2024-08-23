import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  getCardList() {
    return [
      {
        themeColor: '#333333',
        logo: 'github',
        unit: 'Followers',
        desc: 'Github Followers',
      },
      {
        themeColor: '#1e80ff',
        logo: 'juejin',
        unit: '关注',
        desc: '掘金关注卡',
      },
      {
        themeColor: '#d62629',
        logo: 'weibo',
        unit: '粉丝',
        desc: '微博粉丝',
      },
      {
        themeColor: '#20b0e3',
        logo: 'bilibili',
        unit: '粉丝',
        desc: 'bilibili粉丝',
      },
    ];
  }
}
