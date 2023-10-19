import { Transaction } from '../entities/transaction.entity';
import { IEvent } from '@nestjs/cqrs';

/**
 * @class
 * @description Represents the event that gets emitted when a transaction is successfully created.
 */
export class TransactionCreatedEvent implements IEvent {
  /**
   * @constructor
   * @param {Transaction} transaction The transaction data associated with the created event.
   */
  constructor(public readonly transaction: Transaction) { }
}
