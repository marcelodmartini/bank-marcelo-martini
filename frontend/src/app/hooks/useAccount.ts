// Importing services to manage account and transaction data.
import AccountService from "../services/accounts";
import TransactionService from "../services/transactions";
// React is imported to use state and effect hooks for data management.
import React from "react";

/**
 * Asynchronously retrieves the primary account and its associated transactions.
 * 
 * If there are accounts present, it assumes the first account is the primary one.
 * 
 * @async
 * @returns {Promise<Object|null>} An object containing the primary account and its transactions, or null if there are no accounts.
 */
async function fetchAccount() {
  // Retrieve all accounts using the AccountService.
  const accounts = await AccountService.list();

  // If there are no accounts, return null.
  if (!accounts.length) return null;

  // Assuming the first account in the list is the primary account.
  const mainAccount = accounts[0];

  // Fetching transactions associated with the primary account using TransactionService.
  const transactions = await TransactionService.list(mainAccount.id);

  // Returning the main account and its transactions.
  return {
    account: mainAccount,
    transactions,
  };
}

// Type definition for the data returned by the useAccount hook.
type UseAccountData = {
  account: Account;
  transactions: Transaction[];
} | null;

/**
 * A custom React hook for managing the state related to the primary account and its transactions.
 * 
 * Provides a mechanism to fetch, store, and refresh the account and transaction data.
 * 
 * @returns {Object} Contains:
 * - data: The primary account and its associated transactions.
 * - isLoading: A boolean indicating if data fetching is currently in progress.
 * - refreshData: A function to manually refresh the account and transaction data.
 */
export default function useAccount() {
  // State variable to indicate if data fetching is currently in progress.
  const [isLoading, setIsLoading] = React.useState(true);

  // State variable to enforce a minimum loading time for UX considerations.
  const [loaderMinTime, setLoaderMinTime] = React.useState(true);

  // State variable to hold the fetched account and transactions data.
  const [data, setData] = React.useState<UseAccountData>(null);

  /**
   * Method to fetch and update the account and transaction data.
   * 
   * It starts by setting the loading states, fetches the data, updates the state, and then resets the loading indicators.
   * 
   * @async
   */
  const refreshData = async () => {
    // Set the loading indicators.
    setLoaderMinTime(true);
    setIsLoading(true);

    // Fetch the account and transaction data.
    const fetchedData = await fetchAccount();
    setData(fetchedData);

    // Set loading to false as the data fetching is complete.
    setIsLoading(false);

    // Enforce a minimum loader time of 700ms for a smoother UX.
    setTimeout(() => {
      setLoaderMinTime(false);
    }, 700);
  };

  // Using the useEffect hook to fetch the account and transaction data as soon as the component using this hook is mounted.
  React.useEffect(() => {
    refreshData();
  }, []);

  // Return the account data, loading state, and the refresh function.
  return {
    data,
    isLoading: isLoading || loaderMinTime,
    refreshData,
  };
}
