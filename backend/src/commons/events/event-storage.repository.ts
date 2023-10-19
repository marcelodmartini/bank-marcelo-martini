// Service import
import { PrismaService } from "../../databases/prisma.service";

// NestJS imports
import { Injectable, Logger } from "@nestjs/common";

/**
 * EventStorageRepository is a service class responsible for managing and persisting
 * domain events into an event store using the Prisma ORM. This allows for event-sourced 
 * architectures and can help in replaying events or building projections.
 * 
 * @class
 */
@Injectable()
export class EventStorageRepository {

  // Logger instance to output information about this class's processes and errors.
  private readonly logger = new Logger('EventStorageRespository');

  /**
   * Injects the PrismaService to interface with the database.
   * 
   * @param {PrismaService} prisma - The Prisma ORM service.
   */
  constructor(private prisma: PrismaService) { }

  /**
   * Persists a domain event in the event store.
   * 
   * @param {any} payload - The actual data or context of the event.
   * @param {string} eventName - The name or type of the event.
   * @returns {Promise<void>} - Resolves when the event is successfully stored.
   */
  async create(payload: any, eventName: string): Promise<void> {
    try {
      await this.prisma.eventStore.create({
        data: {
          payload: payload,
          name: eventName
        }
      });
    } catch (error) {
      // Log the error details
      this.logger.error(error);
      
      // Log a human-readable error message
      this.logger.error(`There was an error connecting to the event storage.`);
    }
  }
}
