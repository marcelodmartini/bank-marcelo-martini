import { ConflictException, Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { Account } from '../entities/account.entity';
import { AccountCreateDto } from '../dtos/account-create.dto';
import { AccountUpdateDto, Type } from '../dtos/account-update.dto';


/**
 * Service for handling account-related operations.
 */
@Injectable()
export class AccountService {
  /**
   * Constructs the AccountService and injects AccountRepository.
   * @param accountRespository - Repository for account CRUD operations.
   */
  constructor(
    private readonly accountRespository: AccountRepository
  ) { }

  /**
   * Creates a new account.
   * @param accountData - Data required for account creation.
   * @param userId - Unique identifier of the user associated with the account.
   * @returns The created account.
   */
  async createAccount(accountData: AccountCreateDto, userId: string): Promise<Account> {
    return this.accountRespository.create(accountData, userId);
  }

  /**
   * Updates the balance of an account.
   * @param accountData - Data for the update, including the type of operation (withdrawal or deposit).
   * @param userId - Unique identifier of the user associated with the account.
   * @returns The updated account.
   * @throws If there's not enough balance for a withdrawal.
   */
  async update(accountData: AccountUpdateDto, userId: string): Promise<Account> {
    const currentAccount = await this.getBalance(accountData.id, userId);
    let newBalance = currentAccount.balance;

    if (accountData.type === Type.WITHDRAWAL) {
      if (currentAccount.balance < accountData.amount) {
        throw new ConflictException(`You do not have enough money to withdraw.`);
      }
      newBalance -= accountData.amount;
    } else {
      newBalance += accountData.amount;
    }

    return this.accountRespository.update({ id: accountData.id, amount: newBalance, type: accountData.type }, userId);
  }

  /**
   * Retrieves the balance of a specific account.
   * @param id - Unique identifier of the account.
   * @param userId - Unique identifier of the user associated with the account.
   * @returns The requested account.
   * @throws If the account doesn't exist.
   */
  async getBalance(id: number, userId: string): Promise<Account> {
    const account = await this.accountRespository.get(id, userId);
    if (Array.isArray(account)) {
      throw new ConflictException(`You do not have an account, you need to create one first.`);
    }
    return account;
  }

  /**
   * Retrieves all accounts associated with a user.
   * @param userId - Unique identifier of the user.
   * @returns An array of fetched accounts.
   */
  async getAccounts(userId: string): Promise<Account[]> {
    return this.accountRespository.getAll(userId);
  }

}

