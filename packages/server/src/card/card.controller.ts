import { Controller, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { App } from '@/auth/auth.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('getTemplateList')
  @App("ios_app")
  getCardList() {
    return this.cardService.getCardList();
  }
}
