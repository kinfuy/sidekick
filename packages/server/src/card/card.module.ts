import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardTemplate } from './entities/card_template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CardTemplate])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
