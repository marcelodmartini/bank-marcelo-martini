/**
 * Represents a query to fetch transactions based on account and user criteria.
 * This class is designed to be used in the context of the CQRS pattern with NestJS.
 * 
 * @property {number} accountId - The ID of the account for which transactions are to be fetched.
 * @property {string} userId - The ID of the user associated with the account.
 */
export class GetTransactionsQuery {
    /**
     * Create a new GetTransactionsQuery instance.
     * 
     * @param {number} accountId - The ID of the account.
     * @param {string} userId - The ID of the user.
     */
    constructor(
      public readonly userId: string,
      public readonly accountId: number
    ) { }
  }
  