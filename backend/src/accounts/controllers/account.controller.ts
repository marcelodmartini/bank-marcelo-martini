import { 
    Controller, Post, Body, Get, Param, 
    ParseIntPipe, UseGuards, Request 
  } from '@nestjs/common';
  import { 
    ApiBearerAuth, ApiOkResponse, 
    ApiQuery, ApiResponse, ApiTags 
  } from '@nestjs/swagger';
  import { CreateAccountCommand } from '../commands/create-account.command';
  import { AccountCreateDto } from '../dtos/account-create.dto';
  import { Account } from '../entities/account.entity'; 
  import { CommandBus, QueryBus } from '@nestjs/cqrs';
  import { AuthGuard } from '@nestjs/passport';
  import { GetAccountsQuery } from '../queries/get-accounts.query';
  import { GetBalanceQuery } from '../queries/get-balance.query';
  
  /**
   * The AccountController handles HTTP requests related to account operations.
   * It interacts with command and query buses to perform these operations.
   */
  @ApiTags('accounts')
  @Controller('accounts')
  export class AccountController {
  
    constructor(
      private readonly queryBus: QueryBus,
      private readonly commandBus: CommandBus
    ) { }
  
    /**
     * Creates an account with the provided data.
     * 
     * @param accountData - DTO with details required to create an account.
     * @param request - Express request object containing user details.
     * @returns The created account.
     */
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ description: 'Create an Account', type: Account })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async createAccount(
      @Body() accountData: AccountCreateDto, 
      @Request() request
    ): Promise<Account> {
      return await this.commandBus.execute(new CreateAccountCommand(request.user.idUser,accountData));
    }

    /**
     * Retrieves the balance of a specific account associated with the current user.
     * 
     * @param id - ID of the account.
     * @param request - Express request object containing user details.
     * @returns Account details or an empty array.
     */
        @Get(':id/balance')
        @ApiBearerAuth()
        @UseGuards(AuthGuard('jwt'))
        @ApiOkResponse({ description: 'Account Balance', type: Account })
        @ApiResponse({ status: 401, description: 'Unauthorized.' })
        async getBalance(
          @Param('id', ParseIntPipe) id: number, 
          @Request() request
        ): Promise<Account | []> {
          return await this.queryBus.execute(new GetBalanceQuery(id, request.user.idUser));
        }
  
    /**
     * Retrieves a list of accounts associated with the current user.
     * 
     * @param request - Express request object containing user details.
     * @returns An array of accounts.
     */
    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ description: 'List of Accounts', type: [Account] })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getAccounts(@Request() request): Promise<Account[]> {
      return await this.queryBus.execute(new GetAccountsQuery(request.user.idUser));
    }

  }
  