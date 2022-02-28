import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coin } from 'src/entity/coin.entity';
import { user } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(coin) private coinRepository: Repository<coin>,
  ) {}
  async createcoin(name: string, company: string) {
    const coinData = await this.coinRepository.create({
      name: name,
      company: company,
    });
    await this.coinRepository.save(coinData);
  }
}
