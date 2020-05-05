import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
