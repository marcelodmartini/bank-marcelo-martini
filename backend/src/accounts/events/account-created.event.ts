import { Account } from '../entities/account.entity';
import { IEvent } from '@nestjs/cqrs';

/**
 * Represents an event that is triggered after an account has been created.
 * This event contains the created account entity.
 */
export class AccountCreatedEvent implements IEvent {
  /**
   * Creates a new AccountCreatedEvent instance.
   * 
   * @param account - The newly created account entity.
   */
  constructor(public readonly account: Account) {}
}
