import { ICommand } from '@nestjs/cqrs';
import { TransactionCreateDto } from '../dtos/transaction-create.dto';

/**
 * Represents the command for creating a transaction.
 *
 * This command contains the necessary data to create a new transaction.
 * The CQRS pattern is used, where commands are responsible for changes.
 * Implementing the ICommand interface ensures that this class adheres to
 * the structure expected by NestJS's CQRS module for commands.
 */
export class CreateTransactionCommand implements ICommand {

  /**
   * Constructs a new CreateTransactionCommand.
   *
   * @param {TransactionCreateDto} transactionData - Data transfer object containing details for the transaction to be created.
   * @param {string} userId - Identifier of the user initiating the transaction.
   */
  constructor(
    public readonly userId: string,
    public readonly transactionData: TransactionCreateDto,
  ) { }
}
