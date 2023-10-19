// Indicate client side usage.
"use client"

// Importing necessary hooks, components, and UI elements.
import useAccount from "./hooks/useAccount"
import { Card, TabItem, Tabs } from "@aws-amplify/ui-react"
import AccountForm from "./components/accounts/account-form"
import BalanceCard from "./components/accounts/balance-card"
import Loading from "./components/loading"
import TransactionForm from "./components/transactions/transaction-form"
import TransactionList from "./components/transactions/transaction-list"
import Login from "./login/login"

/**
 * Home Component.
 * This component serves as the main entry point to the application after authentication.
 * 
 * @returns {JSX.Element} Rendered Login and Secure components.
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
 * Represents the authenticated section of the application which displays
 * user's account info, balance, transactions, and allows for new transactions.
 * 
 * @returns {JSX.Element} Rendered account information and transaction features.
 */
export function Secure(): JSX.Element {
  const { data, isLoading, refreshData } = useAccount()

  if (isLoading) return <Loading />

  const hasAccount = !!data

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
