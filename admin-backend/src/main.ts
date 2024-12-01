import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 启用CORS以允许前端访问
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
