import { AccountService } from '../services/account.service';
import { GetBalanceQuery } from './get-balance.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

/**
 * Handles the retrieval of the balance for a specific account.
 */
@QueryHandler(GetBalanceQuery)
export class GetBalanceHandler implements IQueryHandler<GetBalanceQuery> {
  
  /**
   * @param accountService - The service responsible for retrieving the account balance.
   */
  constructor(private readonly accountService: AccountService) {}

  /**
   * Executes the query to retrieve the balance of an account.
   * 
   * @param query - Contains the account ID and user ID for retrieving the account's balance.
   * @returns - The balance of the specified account.
   */
  async execute(query: GetBalanceQuery) {
    return this.accountService.getBalance(query.id, query.userId);
  }
}
