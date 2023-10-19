import AccountService from "../services/accounts";
import TransactionService from "../services/transactions";
import React from "react";

/**
 * Asynchronously fetches the main account and its associated transactions.
 * 
 * @async
 * @function
 * @returns {Promise<Object|null>} An object containing the main account and its transactions or null if no accounts are found.
 */
async function fetchAccount() {
  // Get all accounts
  const accounts = await AccountService.list();

  // Return null if there are no accounts
  if (!accounts.length) return null;

  // Assume the first account is the main account
  const mainAccount = accounts[0];

  // Get transactions for the main account
  const transactions = await TransactionService.list(mainAccount.id);

  return {
    account: mainAccount,
    transactions,
  };
}

type UseAccountData = {
  account: Account;
  transactions: Transaction[];
} | null;

/**
 * Custom hook to manage the state related to account and its transactions.
 * 
 * @function
 * @returns {Object} Contains:
 * - data: The account and its associated transactions.
 * - isLoading: A boolean that indicates if data fetching is in progress.
 * - refreshData: A function to manually trigger data refresh.
 */
export default function useAccount() {
  // State to indicate if the data is currently being fetched
  const [isLoading, setIsLoading] = React.useState(true);

  // State to ensure a minimum loading time (for UX purposes)
  const [loaderMinTime, setLoaderMinTime] = React.useState(true);

  // State to store fetched account and transactions data
  const [data, setData] = React.useState<UseAccountData>(null);

  /**
   * Fetches and sets the account and transaction data.
   * 
   * @async
   * @function
   */
  const refreshData = async () => {
    setLoaderMinTime(true);
    setIsLoading(true);

    // Fetch the data
    const fetchedData = await fetchAccount();
    setData(fetchedData);

    setIsLoading(false);

    // Reset the minimum loader time after 700ms
    setTimeout(() => {
      setLoaderMinTime(false);
    }, 700);
  };

  // Fetch the account and transaction data when the component is mounted
  React.useEffect(() => {
    refreshData();
  }, []);

  return {
    data,
    isLoading: isLoading || loaderMinTime,
    refreshData,
  };
}
