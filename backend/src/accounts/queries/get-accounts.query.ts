/**
 * Represents a query to retrieve accounts based on the user ID.
 */
export class GetAccountsQuery {
    /**
     * Creates an instance of GetAccountsQuery.
     * @param userId - Unique identifier of the user for which to fetch accounts.
     */
    constructor(public readonly userId: string) {}
  }
  