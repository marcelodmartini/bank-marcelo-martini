import { GetTransactionsQuery } from '../../../src/transactions/queries/get-transaction.query';
import { CreateTransactionCommand } from '../../../src/transactions/commands/create-transaction.command';
import { Type } from '../../../src/transactions/dtos/transaction-create.dto'
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../../../src/transactions/controllers/transaction.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

/**
 * @fileoverview This test suite is dedicated to ensuring the functionality of the TransactionController.
 * It aims to verify both transaction retrieval and transaction creation.
 */

/**
 * Main test suite for the TransactionController class.
 */
describe('TransactionController', () => {
  /**
   * @description The main controller being tested.
   */
  let controller: TransactionController;

  /**
   * @description The query bus instance for testing.
   */
  let queryBus: QueryBus;

  /**
   * @description The command bus instance for testing.
   */
  let commandBus: CommandBus;

  /**
   * @description Set up the testing module and initialize the required instances before each test.
   * This ensures that every test runs in a clean environment.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [QueryBus, CommandBus],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  /**
   * Test suite for the createTransaction method of the TransactionController.
   * This suite verifies if the method correctly creates transactions.
   */
  describe('createTransaction', () => {

    /**
     * @description Test case to verify if the createTransaction method creates a transaction 
     * using the provided transaction data and user ID.
     * @returns {void}
     */
    it('should create a new transaction', async () => {
      const mockResult = { id: 1, amount: 100, type: Type.DEPOSIT };

      // Mocking the commandBus execution to return a predefined result.
      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockResult);

      const transactionData = { accountId: 1, amount: 100, type: Type.DEPOSIT };
      const request = { user: { idUser: 'awd2323er-d23e23rfwef' } };

      const result = await controller.createTransaction(transactionData, request);

      // Assert that the command bus was called with the correct parameters.
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateTransactionCommand(request.user.idUser,transactionData),
      );

      // Assert that the returned result matches the mock data.
      expect(result).toEqual(mockResult);
    });
  });


  /**
   * Test suite for the getTransactions method of the TransactionController.
   * This suite verifies if the method correctly fetches transactions.
   */
  describe('getTransactions', () => {

    /**
     * @description Test case to verify if the getTransactions method fetches transactions 
     * based on the provided account ID and user ID.
     * @returns {void}
     */
    it('should return an array of transactions', async () => {
      const mockResult = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];

      // Mocking the queryBus execution to return a predefined result.
      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockResult);

      const accountId = 432;
      const request = { user: { idUser: 'awd2323er-d23e23rfwef' } };

      const result = await controller.getTransactions(accountId, request);

      // Assert that the query bus was called with the correct parameters.
      expect(queryBus.execute).toHaveBeenCalledWith(
        new GetTransactionsQuery(request.user.idUser,accountId),
      );

      // Assert that the returned result matches the mock data.
      expect(result).toEqual(mockResult);
    });
  });
});
