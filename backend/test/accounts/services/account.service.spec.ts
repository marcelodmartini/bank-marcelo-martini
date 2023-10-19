// Necessary imports for NestJS testing, exception handling, DTOs, and the service being tested.
import { AccountRepository } from '../../../src/accounts/repositories/account.repository';
import { AccountService } from '../../../src/accounts/services/account.service';
import { AccountCreateDto } from '../../../src/accounts/dtos/account-create.dto';
import { AccountUpdateDto, Type } from '../../../src/accounts/dtos/account-update.dto';
import { Account } from '../../../src/accounts/entities/account.entity';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';


// Main test suite for the AccountService class.
describe('AccountService', () => {
  
  // Declaring service and repository that will be used throughout the test cases.
  let accountService: AccountService;
  let accountRepository: AccountRepository;

  // Setting up the testing environment before each individual test.
  beforeEach(async () => {
    
    // Create a testing module with providers: the service being tested and a mock repository.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          // Mock the methods of the AccountRepository to avoid actual DB operations.
          useValue: {
            get: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    // Initialize the service and mock repository instances.
    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  // Clean up mock data after each test for isolation.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test suite for the 'createAccount' method of AccountService.
  describe('createAccount', () => {
    it('should create an account', async () => {
      // Sample data to simulate a new account creation request.
      const accountData: AccountCreateDto = {
        name: 'Marcelo Martini',
        number: 987654,
      };
      const userId = 'sdf334435t-234234d-234234';
      const createdAccount: Account = {
        id: 1,
        name: accountData.name,
        balance: 0,
        number: accountData.number,
      };

      // Mock the 'create' method of accountRepository to simulate DB operation.
      jest.spyOn(accountRepository, 'create').mockResolvedValue(createdAccount);

      // Execute the method and verify results.
      const result = await accountService.createAccount(accountData, userId);
      expect(accountRepository.create).toHaveBeenCalledWith(accountData, userId);
      expect(result).toEqual(createdAccount);
    });
  });

  // Test suite for 'getAccounts' method.
  describe('getAccounts', () => {
    it('should retrieve accounts for a user', async () => {
      // Sample data to simulate existing accounts for a user.
      const userId = 'sdf334435t-234234d-234234';
      const accounts: Account[] = [
        {
          id: 1,
          name: 'Marcelo Martini',
          balance: 800,
          number: 987654,
        },
        {
          id: 2,
          name: 'Jane Smith',
          balance: 1000,
          number: 87654321,
        },
      ];

      // Mock the 'getAll' method and then validate the output.
      jest.spyOn(accountRepository, 'getAll').mockResolvedValue(accounts);

      const result = await accountService.getAccounts(userId);

      expect(accountRepository.getAll).toHaveBeenCalledWith(userId);
      expect(result).toEqual(accounts);
    });
  });

  // Test suite for 'getBalance' method.
  describe('getBalance', () => {
    it('should retrieve the balance of an account', async () => {
      // Sample data for getting the balance of an account.
      const accountId = 1;
      const userId = 'sdf334435t-234234d-234234';
      const account: Account = {
        id: accountId,
        name: 'Marcelo Martini',
        balance: 800,
        number: 987654,
      };

      // Mock the 'get' method, execute the service method, and validate the output.
      jest.spyOn(accountRepository, 'get').mockResolvedValue(account);

      const result = await accountService.getBalance(accountId, userId);

      expect(accountRepository.get).toHaveBeenCalledWith(accountId, userId);
      expect(result).toEqual(account);
    });

    it('should throw ConflictException if the account is not found', async () => {
      // Handle and test the scenario where an account might not be found.
      const accountId = 1;
      const userId = 'sdf334435t-234234d-234234';

      jest.spyOn(accountRepository, 'get').mockResolvedValue([]);

      await expect(
        accountService.getBalance(accountId, userId),
      ).rejects.toThrow(ConflictException);
      expect(accountRepository.get).toHaveBeenCalledWith(accountId, userId);
    });
  });

  // Test suite for the 'update' method.
  describe('update', () => {
    it('should update the account for a withdrawal', async () => {
      // Sample data and scenario for updating an account with a withdrawal.
      const accountData: AccountUpdateDto = {
        id: 1,
        amount: 400,
        type: Type.WITHDRAWAL,
      };
      const userId = 'sdf334435t-234234d-234234';
      const account: Account = {
        id: 1,
        name: 'Marcelo Martini',
        balance: 800,
        number: 987654,
      };
      const updatedAccount: Account = {
        ...account,
        balance: account.balance - accountData.amount,
      };

      // Mock the necessary methods, execute the service method, and validate the output.
      jest.spyOn(accountRepository, 'get').mockResolvedValue(account);
      jest.spyOn(accountRepository, 'update').mockResolvedValue(updatedAccount);

      const result = await accountService.update(accountData, userId);

      expect(accountRepository.get).toHaveBeenCalledWith(accountData.id, userId);
      expect(accountRepository.update).toHaveBeenCalledWith(
        {
          id: accountData.id,
          amount: updatedAccount.balance,
          type: accountData.type,
        },
        userId,
      );
      expect(result).toEqual(updatedAccount);
    });

    it('should throw ConflictException if the account balance is not sufficient for withdrawal', async () => {
      // Test the scenario where a withdrawal might exceed the account balance.
      const accountData: AccountUpdateDto = {
        id: 1,
        amount: 1000,
        type: Type.WITHDRAWAL,
      };
      const userId = 'sdf334435t-234234d-234234';
      const account: Account = {
        id: 1,
        name: 'Marcelo Martini',
        balance: 800,
        number: 987654,
      };

      jest.spyOn(accountRepository, 'get').mockResolvedValue(account);

      await expect(
        accountService.update(accountData, userId),
      ).rejects.toThrow(ConflictException);
      expect(accountRepository.get).toHaveBeenCalledWith(accountData.id, userId);
    });
  });
});

