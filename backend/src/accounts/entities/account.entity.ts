import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents the account model with properties like id, name, number, and balance.
 */
export class Account {

  /**
   * Unique identifier for the account.
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Unique identifier for the account.' })
  id: number;

  /**
  * Number representing the account's numeric identifier (could be an account number).
  */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Number representing the account\'s numeric identifier.' })
  number: number;


  /**
   * Name associated with the account.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name associated with the account.' })
  name: string;

  /**
   * Current balance of the account.
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Current balance of the account.' })
  balance: number;
}
