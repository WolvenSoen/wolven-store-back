import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entities/token.entity';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';


@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
  ],
  exports: [
    MongooseModule
  ]
})
export class TokenModule {}
