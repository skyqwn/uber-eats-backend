import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: ['https://studio.apollographql.com', 'http://localhost:3000'], // 허용할 출처
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 허용할 HTTP 메서드
  //   allowedHeaders: ['Content-Type', 'Accept'], // 허용할 헤더
  //   credentials: true,
  //   // allowedHeaders: ['content-type', 'Authorization'],
  //   // origin: 'http://localhost:3000',
  //   // credentials: true,
  // });
  await app.listen(4000);
}
bootstrap();
