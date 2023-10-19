import { API } from "aws-amplify";
import AccountService from "../../src/app/services/accounts"; // Adjust the import path as necessary

// Mocking AWS Amplify API
jest.mock("aws-amplify", () => ({
  API: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('AccountService', () => {

  /**
   * Test for creating a new account.
   */
  describe('create', () => {
    const mockName = "John's Account";
    const mockNumber = 1234567890;

    it('should call API.post with the correct parameters', async () => {
      const expectedBody = { body: { name: mockName, number: mockNumber } };

      await AccountService.create(mockName, mockNumber);

      expect(API.post).toHaveBeenCalledWith("api", "/accounts", expectedBody);
    });
  });

  /**
   * Test for listing all accounts.
   */
  describe('list', () => {
    it('should call API.get with the correct endpoint', async () => {
      await AccountService.list();

      expect(API.get).toHaveBeenCalledWith("api", "/accounts", {});
    });
  });

  /**
   * Test for retrieving the balance of a specific account.
   */
  describe('getBalance', () => {
    const accountId = 1;  // Example account ID

    it('should call API.get with the correct endpoint', async () => {
      await AccountService.getBalance(accountId);

      expect(API.get).toHaveBeenCalledWith("api", `${accountId}/balance`, {});
    });
  });
});
