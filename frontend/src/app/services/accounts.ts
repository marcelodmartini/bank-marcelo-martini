// Import the API module from 'aws-amplify' for handling API requests.
import { API } from "aws-amplify"

/**
 * `AccountService` offers methods related to account operations. 
 * This service facilitates creating new accounts, listing all existing accounts, 
 * and fetching the balance for a particular account, using AWS Amplify's API methods.
 */
const AccountService = {

  /**
   * `create` method: Initiates the creation of a new account.
   *
   * @param {string} name - Represents the name associated with the new account.
   * @param {string} number - A unique identifier or number for the new account.
   * @returns {Promise<Account>} A promise that, upon resolution, provides the details of the newly created account.
   */
  async create(name: Account["name"], number: Account["number"]): Promise<Account> {
    return API.post("api", "/accounts", { body: { name, number } });
  },

  /**
   * `list` method: Obtains a list of all the accounts stored in the database.
   *
   * @returns {Promise<Account[]>} A promise that, upon resolution, returns an array consisting of all the accounts.
   */
  async list(): Promise<Account[]> {
    return API.get("api", "/accounts", {});
  },

  /**
   * `getBalance` method: Retrieves the current balance associated with a specific account.
   *
   * @param {string} id - Represents the unique identifier of the account for which the balance is being fetched.
   * @returns {Promise<Account>} A promise that, when resolved, provides the specific account's details including its balance.
   */
  async getBalance(id: Account["id"]): Promise<Account> {
    return API.get("api", `${id}/balance`, {});
  },
}

// Export the `AccountService` to make it accessible to other modules or components that need account-related functionalities.
export default AccountService;
