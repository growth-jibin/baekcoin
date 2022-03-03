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
    const price: number = Math.floor(Math.random() * 1000);
    const coinData = await this.coinRepository.create({
      name: name,
      company: company,
      price: price,
    });
    await this.coinRepository.save(coinData);
  }
  async findcoin(coinid: number) {
    return this.coinRepository.find({ id: coinid });
  }
  async deletecoin(coinid: number) {
    return this.coinRepository.delete(coinid);
  }
  async reqtest(data: any) {
    return console.log(data);
  }
}
