import { GetBalanceHandler } from './get-balance.handler';
import { GetAccountHandler } from './get-accounts.handler';

/**
 * List of all query handlers related to account operations.
 */
export const QueryHandlers = [
    GetBalanceHandler,
    GetAccountHandler     
];

/**
 * Aggregates the queries related to account operations.
 * This allows for streamlined imports in other modules.
 */

export * from './get-balance.query';
export * from './get-accounts.query';
