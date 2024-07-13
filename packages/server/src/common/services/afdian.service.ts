import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as blueimpMd5 from 'blueimp-md5';

import { envConfig } from '@/common/configs/env';
import { lastValueFrom } from 'rxjs';
import { UserException } from '../exceptions/custom.exception';

@Injectable()
export class AFDianService {
    constructor(private readonly httpService: HttpService) {}

    async webhook() {}

    async query() {
        const params = this.generateSign('{"a":1}')
        const url = 'https://afdian.net/api/open/ping'
        const res =  this.httpService.post(url, params)
        try {
            const data = await lastValueFrom(res);
            return data.data
        } catch (error) {
            throw new UserException(error.message);
        }
    }

    private generateSign(params:string) {
        const user_id = envConfig.afdian.userId
        const timestamp = Date.now().toString().slice(0, 10)
        const sign = blueimpMd5(`${envConfig.afdian.token}params${params}ts${timestamp}user_id${user_id}`)
        return { user_id, ts: timestamp, params, sign }
    }
}
