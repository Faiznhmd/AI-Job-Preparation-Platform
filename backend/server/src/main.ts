import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ✅ ADD THIS
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ VERY IMPORTANT (THIS FIXES YOUR ISSUE)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(4000);
}

bootstrap().catch((err) => {
  console.error(err);
});
