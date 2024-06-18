import { Controller, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { Public } from '@/auth/auth.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {

  }

  @Post('getCardList')
  @Public()
  getCardList() {
    return this.cardService.getCardList();
  }
}
