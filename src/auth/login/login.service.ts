import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Token } from '../../token/entities/token.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Token.name)
    private readonly tokenModel: Model<Token>,
  ) {}

  async getAllTokens(): Promise<Token[]> {
    return this.tokenModel.find().exec();
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && user.password === password) {
      const tokens = await this.getAllTokens();
      return {
        message: 'Login exitoso',
        email: user.email,
        userData: user,
        token: tokens[0] ? tokens[0].token : '',
      };
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}
