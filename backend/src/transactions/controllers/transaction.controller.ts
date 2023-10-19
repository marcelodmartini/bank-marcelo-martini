import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { TransactionCreateDto } from '../dtos/transaction-create.dto';
import { Transaction } from '../entities/transaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTransactionsQuery } from '../queries/get-transaction.query';
import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    ParseIntPipe, 
    Post, 
    UseGuards, 
    Request 
  } from '@nestjs/common';
  import { 
    ApiTags, 
    ApiOkResponse, 
    ApiResponse, 
    ApiQuery, 
    ApiBearerAuth 
  } from '@nestjs/swagger';

  /**
   * Transaction Controller handles incoming HTTP requests related to transactions.
   * 
   * This controller provides endpoints to retrieve and create transactions.
   */
  @ApiTags('transactions')
  @Controller('transactions')
  export class TransactionController {
  
    constructor(
      private readonly queryBus: QueryBus,
      private readonly commandBus: CommandBus
    ) { }

    /**
     * Create a new transaction.
     * 
     * @param {TransactionCreateDto} transactionData - Data transfer object containing transaction details.
     * @param {any} request - Express request object.
     * @returns {Promise<Transaction>} - The newly created transaction.
     */
    @Post()
    @ApiQuery({ name: 'accountId', example: '12345678' })
    @ApiQuery({ name: 'type', example: 'DEPOSIT' })
    @ApiOkResponse({ description: 'Create a Transaction', type: Transaction })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({
      status: 409,
      description: 'You do not have enough money to withdraw.',
    })
    @ApiResponse({
      status: 409,
      description: 'You do not have an account, you need to create one first.',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async createTransaction(
      @Body() transactionData: TransactionCreateDto, 
      @Request() request
    ): Promise<Transaction> {
      return await this.commandBus.execute(new CreateTransactionCommand(request.user.idUser,transactionData));
    }
  
    /**
     * Retrieve transactions for a given account.
     * 
     * @param {number} accountId - Identifier of the account.
     * @param {any} request - Express request object.
     * @returns {Promise<Transaction[]>} - A list of transactions.
     */
    @Get(':accountId')
    @ApiOkResponse({ description: 'List of Transactions', type: [Transaction] })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getTransactions(
      @Param('accountId', ParseIntPipe) accountId: number, 
      @Request() request
    ): Promise<Transaction[]> {
      return await this.queryBus.execute(new GetTransactionsQuery(request.user.idUser,accountId));
    }
  }
  