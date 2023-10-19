"use client"

// Importing necessary components from the AWS Amplify UI library.
import { Card, Flex, Text } from "@aws-amplify/ui-react"

interface Props {
  // Account object which contains details about a bank account.
  account: {
    id: number
    name: string
    number: number
    balance: number
  }
}

/**
 * BalanceCard Component
 * 
 * This component provides a user interface to display account details 
 * such as account number, name, and balance in a stylized card format.
 * 
 * @param {Props} props - Properties passed to the component, specifically the account object.
 * @returns {React.ReactElement} The rendered JSX component.
 */
export default function BalanceCard({ account }: Props) {
  return (
    <Flex justifyContent="space-between" alignItems="center" marginBottom="1em">
      <div>
        <Text fontWeight={800} fontSize=".8em">
          Nº Cuenta: {account.number}
        </Text>
        <Text fontWeight={400} fontSize="1em">
          {account.name}
        </Text>
      </div>
      <Text marginLeft="auto" fontSize="1.5em">
        $ {account.balance}
      </Text>
    </Flex>
  )
}
