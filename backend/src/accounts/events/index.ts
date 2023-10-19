import { AccountCreatedHandler } from "./account-created.handler";
import { AccountUpdatedHandler } from "./account-update.handler";

/**
 * A list of event handlers related to account actions.
 * These handlers listen to and respond to various events within the application.
 */
export const EventsHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
];
