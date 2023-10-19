import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { TransactionCreatedEvent } from '../events/transaction-created.event';
import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './create-transaction.command';
import { AccountService } from '../../accounts/services/account.service';
import { AccountUpdatedEvent } from '../../accounts/events/account-update.event';

/**
 * Command handler responsible for handling the creation of transactions.
 *
 * It uses the CQRS pattern where commands are responsible for changes. This
 * handler listens to the CreateTransactionCommand and performs the necessary
 * business logic associated with creating a transaction.
 */
@Injectable()
@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler {
  
  /**
   * Constructor for the CreateTransactionHandler class.
   * 
   * @param {EventBus} event$ - The event bus for publishing domain events.
   * @param {TransactionService} transactionService - Service related to transaction operations.
   * @param {AccountService} accountService - Service related to account operations.
   */
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    private readonly event$: EventBus
  ) { }

  /**
   * Execute the command for creating a transaction.
   *
   * It updates the associated account, creates the transaction,
   * and then publishes relevant domain events.
   *
   * @param {CreateTransactionCommand} command - The command containing transaction details.
   * @returns {Promise<Transaction>} - Returns the created transaction.
   */
  async execute(command: CreateTransactionCommand): Promise<Transaction> {
    const { accountId, amount, type } = command.transactionData;
    
    // Update the account with the transaction details
    const updatedAccount = await this.accountService.update(
      { id: accountId, amount, type },
      command.userId,
    );

    // Create the transaction
    const transaction = await this.transactionService.createTransaction(command.transactionData, command.userId);

    // Publish domain events
    this.event$.publish(new TransactionCreatedEvent(transaction));
    this.event$.publish(new AccountUpdatedEvent(updatedAccount));

    return transaction;
  }
}
