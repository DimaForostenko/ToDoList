import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // Налаштування рівня логування
  });
  app.enableCors({
    origin: 'http://localhost:8888', // Дозволяємо фронтенд
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  await app.listen(3000, () =>
    logger.log('Application is running on port 3000'),
  );
}
bootstrap();
