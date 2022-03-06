import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { coin } from 'src/entity/coin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(coin) private coinRepository: Repository<coin>,
    private readonly jwtService: JwtService,
  ) {}
  async createcoin(name: string, company: string, data: any) {
    const token = await this.jwtService.decode(data);
    if (token['id'] != process.env.ADMIN) {
      throw new UnauthorizedException({ message: '어드민이 아님ㅋㅋ' });
    }
    const price: number = Math.floor(Math.random() * 1000);
    const coinData = await this.coinRepository.create({
      name: name,
      company: company,
      price: price,
    });
    await this.coinRepository.save(coinData);
  }
  async findcoin(coinid: number) {
    return await this.coinRepository.find({ id: coinid });
  }
  async deletecoin(coinid: number) {
    return await this.coinRepository.delete(coinid);
  }
  async coin() {}
}
