import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) representing the properties required
 * to create a new account.
 */
export class AccountCreateDto {

  /**
   * A unique identifier number for the account.
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'A unique number identifier for the account.' })
  number: number;

  /**
   * The name associated with the account.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the account holder.' })
  name: string;

}
