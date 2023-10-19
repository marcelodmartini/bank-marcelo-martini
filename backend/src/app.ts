import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { config } from 'dotenv';

/**
 * Entry point for the NestJS application. 
 * It initializes the application, configures middleware, 
 * sets up Swagger for API documentation, and starts the server.
 */
async function startApp() {
  config();
  const app = await initializeNestApplication();
  configureMiddlewares(app);
  setupSwaggerDocumentation(app);
  const port = determineServerPort();
  await app.listen(port);
}

/**
 * Initializes and returns a NestJS application instance.
 * 
 * @returns {Promise<any>} The initialized NestJS application instance.
 */
async function initializeNestApplication() {
  return await NestFactory.create(AppModule);
}

/**
 * Configures necessary middlewares for the application.
 * 
 * @param {any} app - The NestJS application instance.
 */
function configureMiddlewares(app) {
  // Validates incoming requests to the controllers.
  app.useGlobalPipes(new ValidationPipe());
  
  // Enables cross-origin requests.
  app.enableCors();
}

/**
 * Sets up Swagger documentation for the API.
 * 
 * @param {any} app - The NestJS application instance.
 */
function setupSwaggerDocumentation(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('xepelin')
    .setDescription('Xepelin API description')
    .setVersion('1.0')
    // Specifies JWT bearer authentication for the API.
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);
}

/**
 * Determines the server port based on environment variable or uses the default.
 * 
 * @returns {number} The port number.
 */
function determineServerPort() {
  return process.env.PORT || 3000;
}

startApp();
