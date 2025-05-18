/* src/main.ts */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // keep your global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // --- SWAGGER SETUP ---
  const config = new DocumentBuilder()
    .setTitle('NAK Project API')
    .setDescription('REST API docs for NAK backend')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // now your docs live at http://localhost:3000/api-docs

  // --- END SWAGGER SETUP ---

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}

bootstrap();
