import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { User, UserSchema } from './entities/user.entity';
import { Token } from '../../token/entities/token.entity';
import { TokenSchema } from '../../token/entities/token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ])
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
