import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { App, Public } from '@/auth/auth.guard';
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('github')
  @App("ios_app")
  getGithub(@Query('name') name: string) {
    return this.dataService.getGihubUser(name);
  }

  @Get('juejin')
  @App("ios_app")
  getJuejin(@Query('user_id') user_id: string) {
    return this.dataService.getJuejinUser(user_id);
  }

  @Get('juejin2')
  @App("ios_app")
  getJuejin2(@Query('name') name: string) {
    return this.dataService.getJuejinUser2(name);
  }

}
