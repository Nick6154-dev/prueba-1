import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

async function bootstrap() {
  dotenv.config();
  const port = +process.env.SERVER_PORT;
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.listen(port);
}
bootstrap();
