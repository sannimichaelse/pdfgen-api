// Loads .env file into process.env
import * as dotenv from 'dotenv';
dotenv.config();

import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from './core/filters/exception.filter';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './core/interceptors/logger.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { config } from './config';
import { LoggerService } from './core/services/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PlanService } from './components/plan/services/plan.service';
import { getModelForClass } from '@typegoose/typegoose';
import PlanModel from './components/plan/models/plan.model';

const logger: LoggerService = LoggerService.createLogger('BootstrapApp');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe(config.validation));
  app.useGlobalFilters(new AllExceptionFilter());

  setupSwagger(app);

  // Apply helmet middleware
  app.use(helmet());

  // seed plan
  // const planModel = getModelForClass(PlanModel)
  // const plan = new PlanService(planModel)
  // const seeded = await plan.getPlans();
  // if(seeded.length === 0){
  //   await plan.startPlanSeeding()
  //   logger.log(`Plans seeded successfully`);
  // }

  await app.listenAsync(config.port);
  logger.log(`Server listen on http://localhost:${config.port}`);
}

bootstrap();

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('Users API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
