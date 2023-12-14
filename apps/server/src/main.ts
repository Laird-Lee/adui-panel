import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/types/config.type';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import path from 'path';
import fs from 'fs';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

/**
 * Bootstraps the application.
 * @returns {Promise<void>} A promise that resolves when the application is successfully bootstrapped.
 */
async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  const configService: ConfigService<AllConfigType> = app.get(
    ConfigService<AllConfigType>,
  );

  setupPrefixAndVersioning(app, configService);
  setupGlobalPipesAndInterceptors(app);
  setupSwagger(app);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
  console.info(`
           _____        _   _____                 _ 
     /\\   |  __ \\      (_) |  __ \\               | |
    /  \\  | |  | |_   _ _  | |__) __ _ _ __   ___| |
   / /\\ \\ | |  | | | | | | |  ___/ _\` | '_ \\ / _ | |
  / ____ \\| |__| | |_| | | | |  | (_| | | | |  __| |
 /_/    \\_|_____/ \\__,_|_| |_|   \\__,_|_| |_|\\___|_|                 
  `);

  console.log(`
      Api running at:     http://localhost:${configService.getOrThrow(
        'app.port',
        {
          infer: true,
        },
      )}/${configService.getOrThrow('app.apiPrefix', { infer: true })}

      Swagger running at: http://localhost:${configService.getOrThrow(
        'app.port',
        { infer: true },
      )}/docs
  `);
}

/**
 * Sets up the global prefix and enables versioning for the application.
 * @param {INestApplication} app - The Nest application instance.
 * @param {ConfigService<AllConfigType>} configService - The configuration service.
 * @return {void} - Returns nothing.
 */
function setupPrefixAndVersioning(
  app: INestApplication,
  configService: ConfigService<AllConfigType>,
): void {
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
  );
  app.enableVersioning({ type: VersioningType.URI });
}

/**
 * Sets up global pipes and interceptors for the given app.
 * @param {INestApplication} app - The Nest application object.
 * @return {void}
 */
function setupGlobalPipesAndInterceptors(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
}

/**
 * Sets up Swagger documentation for the specified NestJS application.
 * @param {INestApplication} app - The NestJS application instance.
 * @returns {void}
 */
function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('ADui Panel API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const outputFilePath = path.join(__dirname, '../../swagger.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(document, null, 2));
}

void bootstrap();
