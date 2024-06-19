import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Template } from './entities/template.entity';
import { Card } from './entities/card.entity';

@Module({
  imports: [Template, Card],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
