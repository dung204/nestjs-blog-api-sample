import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NestJS Blog Sample API')
    .setLicense('UNLICENSED', 'https://unlicense.org/')
    .setDescription(
      'An example of a blog API using Nest.js (for learning purposes only)',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'Operations about users')
    .addTag('posts', 'Operations about posts')
    .addTag('tags', 'Operations about tags')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
}
