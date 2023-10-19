import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountModule } from './accounts/account.module';
import { TransactionModule } from './transactions/transaction.module';
import { AuthenticationModule } from './authentications/authentication.module';

/**
 * @class AppModule
 * 
 * @description
 * The main module of the application responsible for orchestrating and bootstrapping the functionality.
 * This module aggregates:
 * - Environment configuration.
 * - Implementation of the CQRS pattern.
 * - Account management.
 * - Transaction management.
 * - User authentication.
 */
@Module({
  imports: [
    // Configure the module to read environment variables from the '.env' file and make them globally accessible.
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // Application-specific modules.
    AccountModule,
    TransactionModule,
    AuthenticationModule,
    // Framework-specific modules.
    CqrsModule,
  ],
  // List of providers that will be instantiated by the NestJS framework.
  providers: [],
  // List of controllers that will be instantiated by the NestJS framework.
  controllers: [],
})
export class AppModule { }

