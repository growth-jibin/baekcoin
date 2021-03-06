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
    const payload = { id: data.id };
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
  async findid(mail: string) {
    const user = await this.userRepository.findOne({ mail: mail });
    await this.mailerService.sendMail({
      to: mail,
      from: '최형우',
      subject: '고객님의 아이디',
      html: '아이디:' + `<b>${user.id}</b>` + '입니다',
    });
    return user.id;
  }
  async test(data: any) {
    console.log(data);
    const tt = await this.jwtService.decode(data);
    console.log(tt);
  }
}
