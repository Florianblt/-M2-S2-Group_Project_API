import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Global interceptor
  const classSerializer = app.select(AppModule).get(ClassSerializerInterceptor);
  app.useGlobalInterceptors(classSerializer);

  // Enable CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
