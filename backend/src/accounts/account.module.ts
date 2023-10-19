import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { AccountRepository } from './repositories/account.repository';
import { PrismaService } from '../databases/prisma.service';
import { EventsHandlers } from './events';
import { CommandHandlers } from './commands';
import { EventStorageService } from '../commons/events/event-storage.service';
import { QueryHandlers } from './queries';
import { EventStorageRepository } from '../commons/events/event-storage.repository';

/**
 * The AccountModule is responsible for managing account-related functionality.
 * It includes services, repositories, event handlers, command handlers, query handlers, and more.
 * 
 * It makes use of the CQRS pattern via the CqrsModule, and manages the lifecycle of various services
 * and handlers associated with account management.
 */
@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountRepository,
    PrismaService,
    EventStorageService,
    EventStorageRepository,
    ...EventsHandlers,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class AccountModule { }
