// Repository import
import { EventStorageRepository } from './event-storage.repository';

// NestJS imports
import { Injectable } from '@nestjs/common';

/**
 * EventStorageService manages the operations related to event storage.
 * This service acts as a bridge between the application logic and data 
 * access layer, providing methods to persist domain events into the event store.
 *
 * @class
 */
@Injectable()
export class EventStorageService {

  /**
   * Injects the EventStorageRepository to access methods for interacting 
   * with the event storage data store.
   * 
   * @param {EventStorageRepository} eventStorageRespository - The repository for event storage.
   */
  constructor(
    private readonly eventStorageRespository: EventStorageRepository,
  ) { }

  /**
   * Creates and persists a new domain event in the event store.
   * 
   * @param {any} payload - The actual data or context of the event.
   * @param {string} eventName - The name or type of the event.
   * @returns {Promise<void>} - Resolves when the event is successfully stored.
   */
  async createEvent(payload: any, eventName: string): Promise<void> {
    await this.eventStorageRespository.create(payload, eventName);
  }
}
