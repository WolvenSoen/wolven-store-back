import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api/v1');

    app.enableCors({
    origin: ['http://localhost:4020', 'http://localhost:4200'], // allow both ports
    credentials: true, // if you need to send cookies or authentication headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
