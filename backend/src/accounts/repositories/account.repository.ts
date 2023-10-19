import { AccountCreateDto } from '../dtos/account-create.dto';
import { AccountUpdateDto } from '../dtos/account-update.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../databases/prisma.service';
import { Account } from '../entities/account.entity';


/**
 * Service class for performing CRUD operations on accounts.
 */
@Injectable()
export class AccountRepository {

  /**
   * Constructs the AccountRepository and injects PrismaService.
   * @param prisma - Instance of the Prisma ORM service.
   */
  constructor(private prisma: PrismaService) { }

    /**
   * Creates a new account with an initial balance of zero.
   * @param data - Data required to create a new account.
   * @param userId - Unique identifier of the user associated with the new account.
   * @returns The created account.
   */
    async create(data: AccountCreateDto, userId: string): Promise<Account> {
        try {
          return await this.prisma.account.create({
            data: {
              ...data,
              userId: userId,
              balance: 0
            },
            select: {
              id: true,
              name: true,
              balance: true,
              number: true
            }
          });
        } catch (error) {
          throw new HttpException(String(error), HttpStatus.FORBIDDEN);
        }
    }

  /**
   * Updates an account's balance.
   * @param params - Parameters containing the account ID and the new amount.
   * @param userId - Unique identifier of the user associated with the account.
   * @returns The updated account.
   */
    async update(params: AccountUpdateDto, userId: string): Promise<Account> {
        try {
        return await this.prisma.account.update({
            where: { id_userId: { id: params.id, userId } },
            data: { balance: params.amount },
        });
        } catch (error) {
        throw new HttpException(String(error), HttpStatus.FORBIDDEN);
        }
    }

  /**
   * Fetches an account by its ID and user ID.
   * @param id - Unique identifier of the account.
   * @param userId - Unique identifier of the user associated with the account.
   * @returns The fetched account or an empty array if not found.
   */
  async get(id: number, userId: string): Promise<Account | []> {
    try {
      return await this.prisma.account.findFirst({
        where: { id, userId },
        select: {
          id: true,
          name: true,
          balance: true,
          number: true
        },
      }) || [];
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Fetches all accounts associated with a user.
   * @param userId - Unique identifier of the user.
   * @returns An array of fetched accounts.
   */
  async getAll(userId: string): Promise<Account[]> {
    try {
      return await this.prisma.account.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          balance: true,
          number: true
        },
      });
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }
}
