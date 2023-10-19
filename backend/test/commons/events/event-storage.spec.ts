// Service and Repository imports
import { EventStorageService } from '../../../src/commons/events/event-storage.service';
import { EventStorageRepository } from '../../../src/commons/events/event-storage.repository';

// NestJS Testing imports
import { Test, TestingModule } from '@nestjs/testing';

/**
 * Tests for the EventStorageService class.
 * This suite ensures that the EventStorageService works as expected, especially
 * in creating and persisting domain events.
 */
describe('EventStorageService', () => {
  let eventStorageService: EventStorageService;
  let eventStorageRepository: EventStorageRepository;

  /**
   * Before each test, the NestJS TestingModule is set up with the necessary
   * providers. Mocked versions of dependencies are provided to isolate the unit of work.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventStorageService,
        {
          provide: EventStorageRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    eventStorageService = module.get<EventStorageService>(EventStorageService);
    eventStorageRepository = module.get<EventStorageRepository>(EventStorageRepository);
  });

  /**
   * After each test, cleanup is performed by clearing all the mocks.
   * This ensures that mock implementations and returned values are reset.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests related to the 'createEvent' method of the EventStorageService.
   */
  describe('createEvent', () => {
    it('should create an event', async () => {
      const payload = {
        id: 3,
        name: "Federico Fernandez",
        number: 4345,
        balance: 0
      };
      const eventName = 'AccountCreatedEvent';

      // Mocking the repository's 'create' method to always resolve successfully.
      jest.spyOn(eventStorageRepository, 'create').mockResolvedValue(undefined);

      // Call the service method with the sample payload and event name.
      await eventStorageService.createEvent(payload, eventName);

      // Assert that the repository's 'create' method was called with the correct arguments.
      expect(eventStorageRepository.create).toHaveBeenCalledWith(payload, eventName);
    });
  });
});
