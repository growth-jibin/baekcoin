import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coin } from 'src/entity/coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([coin])],
  providers: [CoinService],
  controllers: [CoinController],
})
export class CoinModule {}
