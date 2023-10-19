import { API } from "aws-amplify";

/**
 * Service for handling operations related to transactions.
 */
const TransactionService = {

  /**
   * Creates a new transaction.
   * 
   * @param details - An object containing the amount, type, and accountId for the new transaction.
   * @returns A promise that resolves to the newly created transaction.
   */
  async create(details: CreateTransaction): Promise<Transaction> {
    const { amount, type, accountId } = details;
    return API.post("api", "/transactions", { body: { amount, type, accountId } });
  },
  
  /**
   * Retrieves a list of transactions for a specific account.
   * 
   * @param accountId - The ID of the account for which transactions are to be fetched.
   * @returns A promise that resolves to an array of transactions.
   */
  async list(accountId: Account['id']): Promise<Transaction[]> {
    return API.get("api", `/transactions/${accountId}`, {});
  },
}

export default TransactionService;
