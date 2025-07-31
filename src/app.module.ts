import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { ProductModule } from './product/product.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [
        EnvConfiguration
      ]
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
 
    MongooseModule.forRoot(process.env.MONGODB || ''),

    ProductModule,

    TokenModule,

    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
