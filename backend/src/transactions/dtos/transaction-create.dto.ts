import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

/**
 * @enum
 * @description Type represents the kind of transaction that can be made.
 * DEPOSIT indicates money being added to the account.
 * WITHDRAWAL indicates money being taken out of the account.
 */
export enum Type {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

/**
 * @class
 * @description TransactionCreateDto is a data transfer object used for creating transactions.
 * It describes the shape and validations required for the incoming transaction data.
 */
export class TransactionCreateDto {

  /**
   * @description The ID of the account associated with this transaction.
   */
  @ApiProperty({ description: 'The ID of the account associated with this transaction.' })
  @IsNotEmpty({ message: 'Account ID is required.' })
  @IsNumber({}, { message: 'Account ID must be a number.' })
  accountId: number;

  /**
   * @description The amount of money involved in the transaction.
   */
  @ApiProperty({ description: 'The amount of money involved in the transaction.' })
  @IsNotEmpty({ message: 'Amount is required.' })
  @IsNumber({}, { message: 'Amount must be a number.' })
  amount: number;

  /**
   * @description The type of the transaction, either DEPOSIT or WITHDRAWAL.
   */
  @ApiProperty({ description: 'Type of the transaction, either DEPOSIT or WITHDRAWAL.', enum: Type })
  @IsNotEmpty({ message: 'Transaction type is required.' })
  @IsEnum(Type, { message: 'Transaction type must be either DEPOSIT or WITHDRAWAL.' })
  @Expose()
  type: Type;
}
