import { CreateAccountHandler } from "./create-account.handler";

/**
 * @constant CommandHandlers
 * 
 * @description
 * Represents a collection of command handlers utilized throughout the application.
 * 
 * This array serves as a central registry for all command handlers, ensuring that 
 * as new handlers are implemented, they are added here for consistent and 
 * centralized access. 
 * 
 * Whenever a new command handler is created, it should be registered in this list 
 * to maintain the application's modularity and scalability.
 */
export const CommandHandlers = [
  CreateAccountHandler
];
