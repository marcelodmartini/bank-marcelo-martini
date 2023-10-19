"use client"

// AWS Amplify UI Components.
// Card, Flex, and Text components are used to structure and style the transaction details.
import { Card, Flex, Text } from "@aws-amplify/ui-react"

// Props type definition.
interface Props {
  /** An array of transaction objects to display. */
  transactions: Transaction[]  
}

/**
 * TransactionList
 * 
 * A React component responsible for presenting a list of financial transactions. 
 * It displays both the type and the amount of each transaction. 
 * The transaction amounts are color-coded: green for deposits and red for withdrawals.
 * 
 * @example
 * // Use the component in another component.
 * <TransactionList transactions={sampleTransactions} />
 * 
 * @param {Props} props - The properties specific to this component.
 * @returns {React.ReactElement} A styled list of transactions.
 */
export default function TransactionList({ transactions }: Props) {
  
  return (
    <>
      {/* Heading for the list */}
      <Text
        variation="primary"
        as="strong"
        lineHeight="3em"
        fontWeight={800}
        fontSize="1.5em"
        fontStyle="normal"
        textDecoration="none"
        width="30vw"
      >
        Historial
      </Text>
      
      {/* Iterate through the transaction list and render each individual transaction. */}
      {transactions.map((transaction) => (
        // Each transaction is wrapped in a Card for styling.
        <Card variation="outlined" key={transaction.id} marginBottom=".25em">
          <Flex alignItems="center">
            
            {/* Transaction type (Deposit/Withdrawal) */}
            <div>
              <Text fontWeight={800} fontSize=".8em">
                Tipo de operación
              </Text>
              <Text fontWeight={400} fontSize="1em">
                {transaction.type === 'DEPOSIT'? 'DEPOSITO' : 'RETIRO'}
              </Text>
            </div>
            
            {/* Display the transaction amount. 
                The amount will be styled green for deposits and red for withdrawals. */}
            <Text marginLeft="auto" variation={transaction.type==='DEPOSIT' ? "success" : "error"}>
              $ {transaction.amount}
            </Text>
          </Flex>
        </Card>
      ))}
    </>
  )
}
