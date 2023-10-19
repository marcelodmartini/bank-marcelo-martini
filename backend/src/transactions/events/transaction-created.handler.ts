import { EventStorageService } from '../../commons/events/event-storage.service';
import { TransactionCreatedEvent } from './transaction-created.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

/**
 * @class
 * @description Handles the event when a transaction is created.
 * It will store the event data into an event storage system.
 */
@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedHandler implements IEventHandler<TransactionCreatedEvent> {

  /**
   * @constructor
   * @param {EventStorageService} eventStoreService Service for storing events.
   */
  constructor(private eventStoreService: EventStorageService) { }

  /**
   * @async
   * @function handle
   * @description Handles the TransactionCreatedEvent by storing it in the event store.
   * @param {TransactionCreatedEvent} event The event data.
   * @returns {Promise<void>}
   */
  async handle(event: TransactionCreatedEvent): Promise<void> {
    await this.eventStoreService.createEvent(event.transaction, 'TransactionCreatedEvent');
  }
}
