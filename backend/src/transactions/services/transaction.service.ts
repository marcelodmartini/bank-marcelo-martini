import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionCreateDto } from '../dtos/transaction-create.dto';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';


/**
 * A service to handle transaction-related operations.
 */
@Injectable()
export class TransactionService {
  
  constructor(
    private readonly transactionRespository: TransactionRepository,
  ) { }

  /**
   * Creates a new transaction.
   *
   * @param data - Data necessary to create a new transaction.
   * @param userId - The ID of the user creating the transaction.
   * @returns - The newly created transaction.
   */
  async createTransaction(data: TransactionCreateDto, userId: string): Promise<Transaction> {
    return this.transactionRespository.create(data, userId);
  }  

  /**
   * Retrieves transactions for a specified account and user.
   *
   * @param accountId - The ID of the account for which transactions are being fetched.
   * @param userId - The ID of the user associated with the account.
   * @returns - An array of transactions associated with the account and user.
   */
  async getTransactions(accountId: number, userId: string): Promise<Transaction[]> {
    return this.transactionRespository.getTransactionsByAccountId(accountId, userId);
  }
}
