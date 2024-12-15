import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT != '' ? process.env.PORT : 3000;
  await app.listen(port);
  console.log(`Application is running on port ${port}`)
}
bootstrap();