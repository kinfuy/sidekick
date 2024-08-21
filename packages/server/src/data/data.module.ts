import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from './entities/icon.entity';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Icon])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
