"use client"

// Import required components and services.
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import ErrorBadge from "../error-badge"
import TransactionService from "../../services/transactions"
import { Button, Flex, SelectField, Text, TextField } from "@aws-amplify/ui-react"

interface Props {
  refreshData: () => void
  accountId: Account["id"]
}

/**
 * TransactionForm Component
 * 
 * This is a user interface component that provides a form for users 
 * to initiate either a deposit or a withdrawal transaction. After the transaction
 * is executed, the data is refreshed to reflect the recent changes.
 * 
 * Props:
 * - `refreshData`: A function to refresh the transaction data after a successful transaction.
 * - `accountId`: The identifier of the account for which the transaction is made.
 * 
 * @param {Props} props - The properties to pass into the component.
 * @returns {React.ReactElement} The rendered JSX component.
 */
export default function TransactionForm({ accountId, refreshData }: Props) {
  
  // Represents the type of transaction. (0 for deposit, 1 for withdrawal)
  const [type, setType] = useState<number>(0); 
  // Represents any error messages encountered during the transaction.
  const [error, setError] = useState<string>("");

  /**
   * Handle changes to the transaction type dropdown.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} evt - The change event.
   */
  const onTypeChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setType(+evt.currentTarget?.value);
  }

  const operationLabel = type === 0 ? "Depositar" : "Retirar";

  /**
   * Handle the submission of the transaction form. 
   * This function is called when the user attempts to execute a transaction.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    const amount = document.getElementById("amount") as HTMLInputElement;
    
    // Ensure a valid amount has been entered.
    if (!amount?.value) return;

    // Execute the transaction by calling the service.
    TransactionService.create({
      accountId,
      amount: +amount.value,
      type: ["DEPOSIT", "WITHDRAWAL"][type] as TransactionType,
    })
    .then(refreshData)
    .catch((e) => {
      setError(e?.response?.data?.message || '');
    });
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Title for the Transaction Form */}
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
        Nueva Transacción
      </Text>
      {/* Input fields for selecting transaction type and amount */}
      <Flex direction="column">
        <SelectField id="type" label="Tipo de operación" onChange={onTypeChange}>
          <option value={0}>Despósito</option>
          <option value={1}>Retiro</option>
        </SelectField>
        <TextField id="amount" label={`Ingresa el monto a ${operationLabel}`} />
        <Button size="small" variation="primary" type="submit">
          {operationLabel}
        </Button>
      </Flex>
      {/* Error message, if any */}
      <ErrorBadge error={error} />
    </form>
  );
}
