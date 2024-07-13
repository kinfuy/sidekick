import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as blueimpMd5 from 'blueimp-md5';

import { envConfig } from '@/common/configs/env';
import { lastValueFrom } from 'rxjs';
import { UserException } from '../exceptions/custom.exception';

@Injectable()
export class AFDianService {
    constructor(private readonly httpService: HttpService) {}

    async webhook() {
        return { ec: 200 };
    }

    /**
     * 分页获取订单信息
     * @returns 
     */
    async getOrderList() {
        const url = "https://afdian.net/api/open/query-order";
        const params = {}
        return await this.query(url, params)

    }

    /**
     * 查询afdian 数据
     * @param url 
     * @param params 
     * @returns 
     */
    private async query(url: string, params: Record<string, any>) {
        const sign = this.generateSign(JSON.stringify(params))
        const res =  this.httpService.post(url, sign)
        try {
            const data = await lastValueFrom(res);
            return data.data
        } catch (error) {
            throw new UserException(error.message);
        }
    }

    /**
     * 生成afdian 参数
     * @param params 
     * @returns 
     */ 
    private generateSign(params:string) {
        const user_id = envConfig.afdian.userId
        const timestamp = Date.now().toString().slice(0, 10)
        const sign = blueimpMd5(`${envConfig.afdian.token}params${params}ts${timestamp}user_id${user_id}`)
        return { user_id, ts: timestamp, params, sign }
    }
}
