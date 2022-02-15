import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './DTO/user.dto';
import { Response } from 'express';
import { user } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private Authservice: AuthService) {}
  @Post('/register')
  async register(@Body() user: authUserDto) {
    return this.Authservice.register(user);
  }
  @Post('/login')
  async login(@Body() user: authUserDto, @Res() res: Response) {
    try {
      const result = await this.Authservice.login(user).then();
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
  @Patch('/patch')
  async patch(@Body() pw: string, @Body() User: user) {
    console.log(pw);
    this.Authservice.patch(pw, User);
  }
}
