import { IsOptional, IsString } from 'class-validator';

export class authUserDto {
  @IsString()
  @IsOptional()
  readonly id: string;
  @IsString()
  @IsOptional()
  readonly pw: string;
  @IsString()
  @IsOptional()
  readonly mail: string;
  @IsString()
  @IsOptional()
  readonly changedpw: string;
}
