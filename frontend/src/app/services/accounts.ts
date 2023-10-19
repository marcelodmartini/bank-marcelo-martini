import { API } from "aws-amplify"

/**
 * Service responsible for account-related operations, such as 
 * fetching balance, listing all accounts, and creating a new account.
 */
const AccountService = {

  /**
   * Creates a new account with the provided name and number.
   *
   * @param {string} name - The name of the account.
   * @param {string} number - The account number.
   * @returns {Promise<Account>} A promise that resolves to the newly created account data.
   */
  async create(name: Account["name"], number: Account["number"]): Promise<Account> {
    return API.post("api", "/accounts", { body: { name, number } });
  },

  /**
   * Fetches a list of all accounts.
   *
   * @returns {Promise<Account[]>} A promise that resolves to an array of accounts.
   */
  async list(): Promise<Account[]> {
    return API.get("api", "/accounts", {});
  },

  /**
   * Retrieves the balance for a specific account using its ID.
   *
   * @param {string} id - The ID of the account.
   * @returns {Promise<Account>} A promise that resolves to the account data.
   */
  async getBalance(id: Account["id"]): Promise<Account> {
    return API.get("api", `${id}/balance`, {});
  },
}

export default AccountService;
