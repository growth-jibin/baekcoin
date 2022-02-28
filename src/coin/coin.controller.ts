import { Body, Controller, Post } from '@nestjs/common';
import { CoinService } from './coin.service';
import { createCoin } from './DTO/createCoin.dto';

@Controller('coin')
export class CoinController {
  constructor(private coinService: CoinService) {}
  @Post('/create')
  async createCoin(@Body() createCoin: createCoin) {
    await this.coinService.createcoin(createCoin.name, createCoin.company);
  }
}
