import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { App } from '@/auth/auth.guard';
import { DataDto } from './dto/data.dto';
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}


  @Post("userFollowers")
  @App('ios_app')
  getUserFollowers(@Body() data:DataDto) {
    return this.dataService.getFollowers(data);
  }

  @Post("icons")
  @App('ios_app')
  getIcons() {
    return this.dataService.getIcons();
  }
}
