import { API } from "aws-amplify";
import TransactionService from "../../src/app/services/transactions";

// Mocking AWS Amplify API
jest.mock("aws-amplify", () => ({
  API: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('TransactionService', () => {
  /**
   * Test for creating a new transaction.
   */
  describe('create', () => {
    const mockDetails = {
      amount: 100,
      type: "DEPOSIT" as TransactionType,  // Casting the type to TransactionType
      accountId: 12345  // Changed from string to number
    };

    it('should call API.post with the correct parameters', async () => {
      const expectedBody = { body: mockDetails };

      await TransactionService.create(mockDetails);

      expect(API.post).toHaveBeenCalledWith("api", "/transactions", expectedBody);
    });

    it('should return the result from API.post', async () => {
      const mockTransaction = { id: 1, ...mockDetails, createdAt: "2023-10-15T10:10:10Z" };
      (API.post as jest.Mock).mockResolvedValueOnce(mockTransaction);

      const result = await TransactionService.create(mockDetails);

      expect(result).toEqual(mockTransaction);
    });
  });

  /**
   * Test for retrieving transactions of a specific account.
   */
  describe('list', () => {
    const accountId = 12345;  // Changed from string to number

    it('should call API.get with the correct endpoint', async () => {
      await TransactionService.list(accountId);

      expect(API.get).toHaveBeenCalledWith("api", `/transactions/${accountId}`, {});
    });

    it('should return the result from API.get', async () => {
      const mockTransactions = [
        { id: 1, amount: 100, type: "DEPOSIT" as TransactionType, createdAt: "2023-10-15T10:10:10Z", accountId },
        { id: 2, amount: 50, type: "WITHDRAWAL" as TransactionType, createdAt: "2023-10-15T11:11:11Z", accountId }
      ];
      (API.get as jest.Mock).mockResolvedValueOnce(mockTransactions);

      const result = await TransactionService.list(accountId);

      expect(result).toEqual(mockTransactions);
    });
  });
});
