import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggingMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(loggingMiddleware);

  const config = new DocumentBuilder()
    .setTitle('Nest js Course')
    .setDescription('API documentation for nest course')
    .setVersion('1.0.0')
    .setContact(
      'Yury Zaikou',
      'https://www.linkedin.com/in/yuri-zaikov/',
      'ye.zaikou@vebtech.by',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
