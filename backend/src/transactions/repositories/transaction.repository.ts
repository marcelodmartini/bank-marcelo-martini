import { Transaction } from "../entities/transaction.entity";
import { TransactionCreateDto } from "../dtos/transaction-create.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../databases/prisma.service";

/**
 * Provides data access methods for transactions using the Prisma ORM.
 */
@Injectable()
export class TransactionRepository {

  constructor(private readonly prisma: PrismaService) { }

  /**
   * Creates a new transaction record in the database.
   * 
   * @param data - The data required to create a new transaction.
   * @param userId - The ID of the user associated with the transaction.
   * @returns - The created transaction.
   */
  async create(data: TransactionCreateDto, userId: string): Promise<Transaction> {
    try {
      return await this.prisma.transaction.create({
        data: {
          ...data,
          userId
        },
        select: {
          id: true,
          amount: true,
          type: true,
          userId: true,
          accountId: true,
          createdAt: true
        }
      });
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Retrieves transactions for a given account ID and user ID.
   * 
   * @param accountId - The ID of the account to retrieve transactions for.
   * @param userId - The ID of the user associated with the transactions.
   * @returns - An array of transactions.
   */
  async getTransactionsByAccountId(accountId: number, userId: string): Promise<Transaction[]> {
    try {
      return await this.prisma.transaction.findMany({
        where: { userId, accountId },
        select: {
          id: true,
          amount: true,
          type: true,
          createdAt: true,
          accountId: true
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }
}
