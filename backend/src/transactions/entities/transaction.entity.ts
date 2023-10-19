import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';

/**
 * @class
 * @description The Transaction class represents the structure and validations 
 * required for a transaction entity within the system.
 */
export class Transaction {
  
  /**
   * @description The unique identifier of the transaction.
   */
  @ApiProperty({ description: 'The unique identifier of the transaction.' })
  @IsNotEmpty({ message: 'Transaction ID is required.' })
  @IsNumber({}, { message: 'Transaction ID must be a number.' })
  id: number;

  /**
   * @description The ID of the account associated with this transaction.
   */
  @ApiProperty({ description: 'The ID of the account associated with this transaction.' })
  @IsNotEmpty({ message: 'Account ID is required.' })
  @IsNumber({}, { message: 'Account ID must be a number.' })
  accountId: number;  

  /**
   * @description The monetary amount involved in the transaction.
   */
  @ApiProperty({ description: 'The monetary amount involved in the transaction.' })
  @IsNotEmpty({ message: 'Amount is required.' })
  @IsNumber({}, { message: 'Amount must be a number.' })
  amount: number;

  /**
   * @description The type or nature of the transaction.
   */
  @ApiProperty({ description: 'The type or nature of the transaction.' })
  @IsNotEmpty({ message: 'Transaction type is required.' })
  @IsString({ message: 'Transaction type must be a string.' })
  type: string;

  /**
   * @description The timestamp when the transaction was created.
   */
  @ApiProperty({ description: 'The timestamp when the transaction was created.' })
  @IsNotEmpty({ message: 'Creation date is required.' })
  @IsDate({ message: 'Creation date must be a valid date.' })
  createdAt: Date;
}
