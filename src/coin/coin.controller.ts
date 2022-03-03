import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CoinService } from './coin.service';
import { createCoin } from './DTO/createCoin.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('coin')
export class CoinController {
  constructor(private coinService: CoinService) {}
  @Post('/create')
  async createCoin(@Body() createCoin: createCoin) {
    await this.coinService.createcoin(createCoin.name, createCoin.company);
  }
  @Delete('/delete/:id')
  async deleteCoin(@Param('id') coinid: number) {
    await this.coinService.deletecoin(coinid);
  }
  @Get()
  async reqtest(@Req() req: Request) {
    console.log(req);
    const TOKEN_KEY = 'user';
    console.log(req.headers[TOKEN_KEY]);
  }
}
