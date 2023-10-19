import { AccountService } from '../accounts/services/account.service';
import { QueryHandlers } from './queries';
import { EventStorageRepository } from '../commons/events/event-storage.repository';
import { TransactionMiddleware } from './middlewares/transaction.middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../databases/prisma.service';
import { TransactionService } from './services/transaction.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionController } from './controllers/transaction.controller';
import { AccountRepository } from '../accounts/repositories/account.repository';
import { EventStorageService } from '../commons/events/event-storage.service';
import { CommandHandlers } from './commands';
import { EventsHandlers } from './events';
import { CqrsModule } from '@nestjs/cqrs';


/**
 * Represents the Transaction module, bringing together various related
 * components such as services, controllers, and repositories.
 * 
 * This module is responsible for defining and configuring the behavior
 * of these components in relation to the transaction functionality.
 */
@Module({
  imports: [CqrsModule],  // The CQRS module is imported to facilitate the CQRS pattern implementation.
  controllers: [TransactionController],  // Declare the controller that handles transaction routes.
  providers: [
    PrismaService,
    EventStorageRepository,
    EventStorageService,
    TransactionService,
    AccountRepository,
    ...EventsHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    TransactionRepository,
    AccountService
  ]  // Declare all the necessary providers (services, repositories, handlers) for this module.
})
export class TransactionModule implements NestModule {
  /**
   * Method to configure middlewares for the routes defined by the module.
   * In this case, the TransactionMiddleware is applied to the POST route of transactions.
   * 
   * @param consumer - Provides a way to register middleware for certain routes.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TransactionMiddleware)
      .forRoutes({ path: 'transactions', method: RequestMethod.POST });
  }
}
