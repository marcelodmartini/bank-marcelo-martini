import { AccountService } from '../services/account.service';
import { GetAccountsQuery } from './get-accounts.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

/**
 * Handles the retrieval of accounts based on the provided user ID.
 */
@QueryHandler(GetAccountsQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountsQuery> {
  
  /**
   * @param accountService - The service responsible for account-related operations.
   */
  constructor(private readonly accountService: AccountService) {}

  /**
   * Executes the query to retrieve accounts.
   * 
   * @param query - Contains the user ID used for retrieving associated accounts.
   * @returns - A list of accounts associated with the provided user ID.
   */
  async execute(query: GetAccountsQuery) {
    return this.accountService.getAccounts(query.userId);
  }
}
