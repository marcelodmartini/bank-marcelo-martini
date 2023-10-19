import { GetTransactionHandler } from "./get-transaction.handler";

/**
 * An array of query handlers for the transaction module.
 * As the application grows and more query handlers are created,
 * they can be added to this array for centralized management.
 * @type {Array<Function>}
 */
export const QueryHandlers = [GetTransactionHandler];

/**
 * Re-exporting all exports from the `get-transaction.query` module.
 * This approach facilitates cleaner and more manageable import statements in consuming modules.
 */
export * from './get-transaction.query';

