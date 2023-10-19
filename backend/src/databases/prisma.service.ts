import { PrismaClient } from '@prisma/client';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

/**
 * PrismaService class integrates the PrismaClient with a NestJS application.
 * It handles the database connection lifecycle and ensures graceful shutdown of the application.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  /**
   * This method is a lifecycle event provided by NestJS that is called when the module is initialized.
   * Here, we establish a connection to the database using Prisma.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Enables shutdown hooks for the NestJS application.
   * This ensures that when PrismaClient emits a 'beforeExit' event, the NestJS application is closed gracefully.
   * 
   * @param app - An instance of the NestJS application.
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
