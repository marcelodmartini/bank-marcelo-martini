/**
 * Represents a query to retrieve the balance of an account
 * based on its ID and the associated user ID.
 */
export class GetBalanceQuery {
    /**
     * Creates an instance of GetBalanceQuery.
     * @param id - Unique identifier of the account for which to fetch the balance.
     * @param userId - Unique identifier of the user associated with the account.
     */
    constructor(public readonly id: number, public readonly userId: string) {}
  }
  