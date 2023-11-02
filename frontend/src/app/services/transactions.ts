// Import the API module from 'aws-amplify' which provides methods for making API requests.
import { API } from "aws-amplify";

/**
 * `TransactionService` is a set of methods for interacting with transactions.
 * These methods facilitate the creation and retrieval of transactions, 
 * particularly when integrated with an API that's set up using AWS Amplify.
 */
const TransactionService = {

  /**
   * `create` method: Initiates the creation of a new transaction.
   * 
   * @param details - An object containing the essential details for the new transaction. 
   *                  This includes the amount to be transacted, the type of transaction (e.g., DEPOSIT, WITHDRAWAL),
   *                  and the associated accountId where the transaction takes place.
   * @returns A promise that, when resolved, provides the details of the newly created transaction.
   */
  async create(details: CreateTransaction): Promise<Transaction> {
    const { amount, type, accountId } = details;
    return API.post("api", "/transactions", { body: { amount, type, accountId } });
  },
  
  /**
   * `list` method: Fetches a list of transactions for a specified account.
   * 
   * @param accountId - A unique identifier representing the account for which transactions are being retrieved.
   * @returns A promise that, when resolved, provides an array containing the transactions associated with the given accountId.
   */
  async list(accountId: Account['id']): Promise<Transaction[]> {
    return API.get("api", `/transactions/${accountId}`, {});
  },
}

// Export the `TransactionService` to make it available for other modules or components that require transaction operations.
export default TransactionService;

