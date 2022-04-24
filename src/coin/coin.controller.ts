import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CoinService } from './coin.service';
import { createCoin } from './DTO/createCoin.dto';
import { Request } from 'express';

@Controller('coin')
export class CoinController {
  constructor(private coinService: CoinService) {}
  @Post('/create')
  async createCoin(@Body() createCoin: createCoin, @Req() req: Request) {
    const TOKEN_KEY = 'user';
    await this.coinService.createcoin(
      createCoin.name,
      createCoin.company,
      req.headers[TOKEN_KEY],
    );
  }
  @Delete('/delete/:id')
  async deleteCoin(@Param('id') coinid: number) {}
}
