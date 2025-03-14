import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './logger/error.handling';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston-logger';

async function start() {
  try {
    const PORT = process.env.PORT ?? 3005
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
    .setTitle('Librarian project')
    .setDescription('Librarian project REST Api')
    .setVersion('1.0')
    .addTag(
      "NESTJS validation, swagger, guard, prisma, pg, mailer"
    )
    .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(PORT, () => {
      console.log(`Server stared at: http://localhost:${PORT}`);
    })
    
  } catch (error) {
    console.log(error);
  }
}

start();