import { TransactionCreateDto, Type } from '../../../src/transactions/dtos/transaction-create.dto';
import { Transaction } from '../../../src/transactions/entities/transaction.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../../../src/transactions/services/transaction.service';
import { TransactionRepository } from '../../../src/transactions/repositories/transaction.repository';

/**
 * This test suite is designed to verify the functionality and behavior
 * of the TransactionService class. It leverages Jest's mocking capabilities
 * to isolate the service's behavior from external dependencies like the 
 * TransactionRepository.
 */
describe('TransactionService', () => {
  let transactionService: TransactionService;
  let transactionRepository: TransactionRepository;

  /**
   * Before each test run, we initialize the testing module which replicates 
   * our service's runtime environment, but with mock versions of dependencies.
   * This ensures that each test runs against a clean, isolated instance of the
   * service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            getTransactionsByAccountId: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
  });

  /**
   * After each test run, any established mock behaviors or spies are reset 
   * to ensure they do not inadvertently influence other tests.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * This test suite targets the createTransaction method of the TransactionService.
   * The goal is to ensure that transaction creation processes data correctly and 
   * delegates to the underlying repository appropriately.
   */
  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const transactionData: TransactionCreateDto = {
        amount: 1000,
        type: Type.DEPOSIT,
        accountId: 1
      };
      const userId = 'awd2323er-d23e23rfwef';
      const createdTransaction: Transaction = {
        id: 8,
        amount: 1000,
        type: "DEPOSIT",
        accountId: 1,
        createdAt: new Date("2023-06-27T13:08:40.291Z")
      };

      // Mock the behavior of the repository's method to simulate
      // a successful create operation.
      jest.spyOn(transactionRepository, 'create').mockResolvedValue(createdTransaction);

      const result = await transactionService.createTransaction(transactionData, userId);

      // Validate that the service correctly interacts with its underlying repository.
      expect(transactionRepository.create).toHaveBeenCalledWith(transactionData, userId);
      // Validate that the service correctly processes and returns the data from the repository.
      expect(result).toEqual(createdTransaction);
    });
  });

  /**
   * This test suite focuses on the getTransactions method of TransactionService.
   * It verifies that the method correctly interacts with its underlying 
   * repository and handles data as expected.
   */
  describe('getTransactions', () => {
    it('should retrieve transactions for an account', async () => {
      const accountId = 1;
      const userId = 'awd2323er-d23e23rfwef';
      const transactions: Transaction[] = [
        {
          id: 1,
          amount: 1000,
          type: "DEPOSIT",
          createdAt: new Date("2023-06-27T13:08:40.291Z"),
          accountId: 1
        }
      ];

      // Mock the behavior of the repository's method to simulate
      // a successful fetch operation.
      jest.spyOn(transactionRepository, 'getTransactionsByAccountId').mockResolvedValue(transactions);

      const result = await transactionService.getTransactions(accountId, userId);

      // Validate that the service calls the repository with the correct parameters.
      expect(transactionRepository.getTransactionsByAccountId).toHaveBeenCalledWith(accountId, userId);
      // Validate that the service correctly returns the data fetched from the repository.
      expect(result).toEqual(transactions);
    });
  });
});
