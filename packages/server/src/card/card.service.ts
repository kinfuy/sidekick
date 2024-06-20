import { Injectable } from '@nestjs/common';
import { ICardTemplate } from './card.interface';

@Injectable()
export class CardService {
    getCardList():ICardTemplate[] {
        return [{
            id: 1,
            name: '社交卡片',
            type: 1,
            content: {
                id: 1,
                refresh: {
                    type: 2,
                    api: 'https://api.github.com/users/github',
                },
                title: 'Github Followers',
                unit: 'Followers',
                logo: 'https://api.kinfuy.cn/assets/github.svg',
                color: '#333333',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        },
        {
            id: 2,
            name: '社交卡片',
            type: 1,
            content: {
                id: 1,
                refresh: {
                    type: 1,
                    
                },
                title: '小红书粉丝卡',
                unit: '粉丝',
                logo: 'https://api.kinfuy.cn/assets/readbook.svg',
                color: '#f8f9fa',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        },
        {
            id: 3,
            name: '社交卡片',
            type: 1,
            content: {
                id: 1,
                refresh: {
                    type: 1,
                },
                title: '即刻关注卡',
                unit: '关注',
                logo: 'https://api.kinfuy.cn/assets/jike.svg',
                color: '#f8f9fa',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        },
        {
            id: 4,
            name: '社交卡片',
            type: 1,
            content: {
                id: 1,
                refresh: {
                    type: 1,
                },
                title: 'Bilibili 粉丝卡',
                unit: '粉丝',
                logo: 'https://api.kinfuy.cn/assets/bilibili.svg',
                color: '#f8f9fa',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        },
        {
            id: 5,
            name: '社交卡片',
            type: 1,
            content: {
                id: 1,
                refresh: {
                    type: 1,
                },
                title: '抖音粉丝卡',
                unit: '粉丝',
                logo: 'https://api.kinfuy.cn/assets/douyin.svg',
                color: '#f8f9fa',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        },
        {
            id: 6,
            name: '社交卡片',
            type: 1,
            content: {
                id: 1,
                refresh: {
                    type: 2,
                    api: 'https://api.kinfuy.cn/api/juejin',
                },
                title: '掘金关注卡',
                unit: '关注',
                logo: 'https://api.kinfuy.cn/assets/juejin.svg',
                color: '#f8f9fa',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        }
    ];
    }
}
