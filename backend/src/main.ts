import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { config } from 'dotenv';
import rateLimit from 'express-rate-limit';

/**
 * Entry point for the NestJS application. 
 * It initializes the application, configures middleware, 
 * sets up Swagger for API documentation, and starts the server.
 */
async function startApp() {
  config();
  const app = await initializeNestApplication();
  configurateRateLimite(app);
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
/**
 * windowMs: Defines the time period in which the number of requests is counted. In this case, 15 minutes have been set. 
 * So if an IP makes 100 requests in less than 15 minutes, it will be blocked until the time window passes.
 * max: The maximum number of requests allowed from a single IP within the specified time window. In this example, 
 * it has been set to 100 requests. With this configuration, if an IP exceeds 100 requests in 15 minutes,
 * additional requests from that IP will be blocked until the current time window expires.
 */
function configurateRateLimite(app) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
}

startApp();
