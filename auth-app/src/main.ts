import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

 
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    

    .setDescription('API d authentification avec NestJS, Prisma et PostgreSQL')
    

    .setVersion('1.0')
    

    .addBearerAuth()
    

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

  await app.listen(3001);
}
bootstrap();