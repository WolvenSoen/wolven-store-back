import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://wolven-store-front.vercel.app'], // or '*' for all origins, or an array of allowed origins
    credentials: true, // if you need to send cookies or authentication headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Apply AuthGuard globally
  app.useGlobalGuards(new AuthGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
