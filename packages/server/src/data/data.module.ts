import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from './entities/icon.entity';
import { AxiosService } from '@/common/services/http.services';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Icon])],
  controllers: [DataController],
  providers: [AxiosService, DataService],
  exports: [DataService],
})
export class DataModule {}
