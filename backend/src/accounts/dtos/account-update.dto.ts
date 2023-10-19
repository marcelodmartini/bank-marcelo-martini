import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Enumeration of transaction types.
 */
export enum Type {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

/**
 * Data Transfer Object (DTO) representing the properties required
 * to update an account's transaction details.
 */
export class AccountUpdateDto {

  /**
   * The amount associated with the transaction.
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The transaction amount.' })
  amount: number;

  /**
   * The unique identifier of the account.
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The unique identifier of the account.' })
  id: number;

  /**
   * The type of transaction being made.
   */
  @IsEnum(Type)
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ description: 'Type of transaction.', enum: Type })
  type: Type;
}
