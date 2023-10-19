import { AccountCreateDto } from '../dtos/account-create.dto';
import { ICommand } from '@nestjs/cqrs';

/**
 * Represents a command to create a new account.
 *
 * Implements the ICommand interface from NestJS CQRS module.
 * This command is a part of the CQRS pattern, specifically the command aspect.
 * Commands in CQRS represent operations that change the system's state.
 */
export class CreateAccountCommand implements ICommand {

  /**
   * Creates an instance of the CreateAccountCommand.
   *
   * @param {AccountCreateDto} accountData - Data transfer object containing the details of the account to be created.
   * @param {string} userId - Unique identifier of the user associated with the account to be created.
   */
  constructor(
    public readonly userId: string,
    public readonly accountData: AccountCreateDto,
  ) { }
}
