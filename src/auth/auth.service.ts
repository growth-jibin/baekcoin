import { Delete, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>,
    private readonly jwtService: JwtService,
  ) {}
  async register(data: any) {
    const user = await this.userRepository.findOne({ id: data.id });

    if (user) {
      throw new UnauthorizedException();
    }
    const hashpw = await bcrypt.hash(data.pw, 10);
    const UserData = this.userRepository.create({
      id: data.id,
      pw: hashpw,
      mail: data.mail,
    });
    const User = await this.userRepository.save(UserData);

    delete UserData.pw;

    return UserData;
  }
  async login(data: any) {
    const User = this.userRepository.findOne({ id: data.id });
    if (User && (await User).id !== data.id) {
      throw new UnauthorizedException();
    }
    const payload = { id: data.id, mail: data.mail };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
  async patch(pw: string, User: user) {
    this.userRepository.update(pw, User);
  }
}
