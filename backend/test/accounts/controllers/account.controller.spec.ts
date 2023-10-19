import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../../../src/accounts/controllers/account.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../../../src/accounts/commands/create-account.command';
import { GetAccountsQuery } from '../../../src/accounts/queries/get-accounts.query';
import { GetBalanceQuery } from '../../../src/accounts/queries/get-balance.query';
import { AccountCreateDto } from '../../../src/accounts/dtos/account-create.dto';
import { Account } from '../../../src/accounts/entities/account.entity';

/**
 * Unit tests for the AccountController.
 * 
 * These tests ensure that the AccountController behaves as expected when it interacts
 * with command and query buses to perform operations related to accounts.
 */
describe('AccountController', () => {
  let controller: AccountController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  // Setup logic before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [CommandBus, QueryBus],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  // Tests for the createAccount method of the AccountController
  describe('createAccount', () => {
    it('should successfully create an account based on provided data', async () => {
      const accountData: AccountCreateDto = {
        name: 'Marcelo Martini',
        number: 987654,
      };
      const userId = 'sdf334435t-234234d-234234';

      // Mock the commandBus to simulate an account creation
      const commandSpy = jest.spyOn(commandBus, 'execute').mockResolvedValue(new Account());

      const result = await controller.createAccount(accountData, { user: { idUser: userId } });

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Account);
      expect(commandSpy).toHaveBeenCalledWith(new CreateAccountCommand(userId,accountData));
    });
  });

  // Tests for the getAccounts method of the AccountController
  describe('getAccounts', () => {
    it('should retrieve a list of accounts for the given user', async () => {
      const userId = 'sdf334435t-234234d-234234';

      // Mock the queryBus to simulate account retrieval
      const querySpy = jest.spyOn(queryBus, 'execute').mockResolvedValue([new Account()]);

      const result = await controller.getAccounts({ user: { idUser: userId } });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result[0]).toBeInstanceOf(Account);
      expect(querySpy).toHaveBeenCalledWith(new GetAccountsQuery(userId));
    });
  });

  // Tests for the getBalance method of the AccountController
  describe('getBalance', () => {
    it('should retrieve the balance of a specific account for a given user', async () => {
      const accountId = 1;
      const userId = 'sdf334435t-234234d-234234';

      // Mock the queryBus to simulate balance retrieval
      const querySpy = jest.spyOn(queryBus, 'execute').mockResolvedValue(new Account());

      const result = await controller.getBalance(accountId, { user: { idUser: userId } });

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Account);
      expect(querySpy).toHaveBeenCalledWith(new GetBalanceQuery(accountId, userId));
    });
  });
});
