import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter()); // global filter 사용
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
