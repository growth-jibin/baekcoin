import { Delete, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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
  async patch(id: string, changedpw: string) {
    const hashingchangedpassword = await bcrypt.hash(changedpw, 10);

    const user = await this.userRepository.findOne({ id: id });

    user.pw = hashingchangedpassword;

    this.userRepository.save(user);
  }
  async delete(id: string) {
    this.userRepository.delete({ id: id });
  }
  async sendMail(mail: string) {
    const number: number = 1234;
    console.log(number);

    await this.mailerService.sendMail({
      to: mail,
      subject: 'test code',
      html: '6자리 코드:' + `<b>${number}</b>`,
    });
    return number;
  }
}
