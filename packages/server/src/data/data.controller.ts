import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { Public } from '@/auth/auth.guard';
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('github')
  @Public()
  getGithub(@Query('name') name: string) {
    return this.dataService.getGihubUser(name);
  }

  @Get('juejin')
  @Public()
  getJuejin(@Query('user_id') user_id: string) {
    return this.dataService.getJuejinUser(user_id);
  }

  @Get('juejin2')
  @Public()
  getJuejin2(@Query('nickname') nickname: string) {
    return this.dataService.getJuejinUser2(nickname);
  }
}
