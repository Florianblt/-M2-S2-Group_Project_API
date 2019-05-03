import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  config();

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('API - starting project ')
    .setDescription('API for starting project')
    .setBasePath('v1/api')
    .setVersion('1.0')
    .addTag('starting')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1/api/docs', app, document);

  // Global prefix
  app.setGlobalPrefix('v1/api');

  // Enable CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
