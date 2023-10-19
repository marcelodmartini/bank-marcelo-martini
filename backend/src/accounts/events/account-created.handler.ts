import { EventStorageService } from '../../commons/events/event-storage.service';
import { AccountCreatedEvent } from './account-created.event'
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

/**
 * The AccountCreatedHandler listens for the AccountCreatedEvent.
 * When the event is triggered, it will save the event in the event store.
 */
@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler implements IEventHandler<AccountCreatedEvent> {

  /**
   * @param eventStoreService - Service responsible for managing events in storage
   */
  constructor(private readonly eventStoreService: EventStorageService) { }

  /**
   * Handles the AccountCreatedEvent by storing it in the event store.
   *
   * @param event - The triggered AccountCreatedEvent
   */
  async handle(event: AccountCreatedEvent): Promise<void> {
    await this.eventStoreService.createEvent(event.account, 'AccountCreatedEvent');
  }
}
