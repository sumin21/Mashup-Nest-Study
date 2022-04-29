import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 이상한 값이 우리의 validator에 도달하지 않게
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // 받은 값을 원하는 타입으로 변환
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
