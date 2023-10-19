import { GetTransactionsQuery } from './get-transaction.query';
import { TransactionService } from '../services/transaction.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

/**
 * @description Handler for the GetTransactionsQuery. When the query is dispatched,
 * this handler retrieves the desired transaction data by leveraging the TransactionService.
 * @class
 * @implements {IQueryHandler<GetTransactionsQuery>}
 */
@QueryHandler(GetTransactionsQuery)
export class GetTransactionHandler implements IQueryHandler<GetTransactionsQuery> {

  /**
   * Creates an instance of GetTransactionHandler.
   * @param {TransactionService} transactionService - Service to retrieve transaction data.
   */
  constructor(private readonly transactionService: TransactionService) { }

  /**
   * Fetches the transactions based on the criteria provided in the query.
   * @param {GetTransactionsQuery} query - The criteria to filter transactions.
   * @returns {Promise<any>} The list of transactions matching the query.
   */
  async execute(query: GetTransactionsQuery) {
    return this.transactionService.getTransactions(query.accountId, query.userId);
  }
}
