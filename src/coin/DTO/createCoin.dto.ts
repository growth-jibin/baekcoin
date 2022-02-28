import { IsString } from 'class-validator';

export class createCoin {
  @IsString()
  readonly name: string;
  @IsString()
  readonly company: string;
}
