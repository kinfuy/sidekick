import { Injectable } from '@nestjs/common';
import { ICardTemplate, ISocialCard } from './card.interface';

@Injectable()
export class CardService {
    getCardList():ICardTemplate[] {
        return [{
            id: 1,
            name: '社交卡片',
            type: 1,
            content: {
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
                title: '抖音粉丝卡',
                unit: '粉丝',
                logo: 'https://api.kinfuy.cn/assets/douyin.svg',
                color: '#f8f9fa',
            } ,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        }
    ];
    }
}
