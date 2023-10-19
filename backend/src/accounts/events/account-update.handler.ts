import { EventStorageService } from '../../commons/events/event-storage.service';
import { AccountUpdatedEvent } from './account-update.event'
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';


/**
 * The AccountUpdatedHandler listens for the AccountUpdatedEvent.
 * Upon receiving the event, it persists the event details in the event store.
 */
@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler implements IEventHandler<AccountUpdatedEvent> {

  /**
   * @param eventStoreService - Service for managing events within storage
   */
  constructor(private readonly eventStoreService: EventStorageService) { }

  /**
   * Handles the AccountUpdatedEvent by saving its details in the event store.
   *
   * @param event - The triggered AccountUpdatedEvent
   */
  async handle(event: AccountUpdatedEvent): Promise<void> {
    await this.eventStoreService.createEvent(event.account, 'AccountUpdatedEvent');
  }
}
