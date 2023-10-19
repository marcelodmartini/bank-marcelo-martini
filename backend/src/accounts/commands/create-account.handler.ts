import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { AccountCreatedEvent } from '../events/account-created.event';
import { CreateAccountCommand } from './create-account.command';


/**
 * Handles the command to create a new account.
 * Once the account is created, an event is published to notify other parts of the system.
 */
@CommandHandler(CreateAccountCommand)
@Injectable()
export class CreateAccountHandler {

  /**
   * Constructs the CreateAccountHandler.
   *
   * @param {EventBus} event$ - The NestJS CQRS event bus, used to publish events.
   * @param {AccountService} accountService - Service to manage accounts.
   */
  constructor(
    private readonly accountService: AccountService,
    private readonly event$: EventBus
  ) { }

  /**
   * Executes the command to create a new account.
   *
   * @param {CreateAccountCommand} command - The command containing the details to create a new account.
   * @returns {Promise<Account>} - A promise that resolves to the created account.
   */
  async execute(command: CreateAccountCommand): Promise<Account> {
    const account = await this.accountService.createAccount(command.accountData, command.userId);
    this.event$.publish(new AccountCreatedEvent(account));
    return account;
  }
}
