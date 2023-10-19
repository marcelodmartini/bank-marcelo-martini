import { Account } from '../entities/account.entity';
import { IEvent } from '@nestjs/cqrs';

/**
 * Represents an event that is triggered after an account has been updated.
 * This event contains the updated account entity.
 */
export class AccountUpdatedEvent implements IEvent {
  /**
   * Creates a new AccountUpdatedEvent instance.
   * 
   * @param account - The updated account entity.
   */
  constructor(public readonly account: Account) {}
}
