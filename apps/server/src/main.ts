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

/**
 * Bootstraps the application.
 * @returns {Promise<void>} A promise that resolves when the application is successfully bootstrapped.
 */
async function bootstrap() {
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
) {
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
function setupGlobalPipesAndInterceptors(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

/**
 * Sets up Swagger documentation for the specified NestJS application.
 * @param {INestApplication} app - The NestJS application instance.
 * @returns {void}
 */
function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('ADui Panel API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

void bootstrap();
