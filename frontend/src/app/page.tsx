// Indicate that the following code is meant for client side execution.
"use client"

// Import hooks, UI components, and other necessary elements for the application.
import useAccount from "./hooks/useAccount" // Hook to manage account state and operations.
import { Card, TabItem, Tabs } from "@aws-amplify/ui-react" // UI components from AWS Amplify.
import AccountForm from "./components/accounts/account-form" // Form to handle account creation and edits.
import BalanceCard from "./components/accounts/balance-card" // Component to display user's account balance.
import Loading from "./components/loading" // Loading component for asynchronous operations.
import TransactionForm from "./components/transactions/transaction-form" // Form to handle transaction creation.
import TransactionList from "./components/transactions/transaction-list" // List to display transaction history.
import Login from "./login/login" // Authentication and login component.

/**
 * Home Component.
 * Serves as the main entry point to the application post-authentication.
 * Wraps the main app functionalities within the Login component to ensure user authentication.
 * 
 * @returns {JSX.Element} Rendered combination of Login and Secure components.
 */
export default function Home(): JSX.Element {
  return (
    <Login>
      <Secure />
    </Login>
  )
}

/**
 * Secure Component.
 * Represents the authenticated section of the application. This section provides access
 * to the user's account information, balance, transaction functionalities, and transaction history.
 * 
 * @returns {JSX.Element} Rendered set of features including account management, transaction creation, and transaction history.
 */
export function Secure(): JSX.Element {
  // Utilize the account hook to fetch and manage account related data.
  const { data, isLoading, refreshData } = useAccount()

  // If data is being loaded, display a loading spinner.
  if (isLoading) return <Loading />

  // Determine if user has an account.
  const hasAccount = !!data

  // Render appropriate components based on the account status and available transactions.
  return (
    <Card variation="outlined">
      {!hasAccount && <AccountForm refreshData={refreshData} />}
      {hasAccount && <BalanceCard account={data?.account} />}
      {hasAccount && (
        <Tabs justifyContent="flex-start">
          <TabItem title="Transacción">
            <TransactionForm accountId={data.account.id} refreshData={refreshData} />
          </TabItem>
          {data.transactions.length > 0 && (
            <TabItem title="Historial">
              <TransactionList transactions={data.transactions} />
            </TabItem>
          )}
        </Tabs>
      )}
    </Card>
  )
}
