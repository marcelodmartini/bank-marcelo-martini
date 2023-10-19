"use client"

// Importing necessary dependencies and components.
import { Badge, Button, Flex, Text, TextField } from "@aws-amplify/ui-react"
import { FormEventHandler, useState } from "react"
import ErrorBadge from "../error-badge"
import AccountService from "../../services/accounts"

interface Props {
  // Function to refresh account data after a successful operation.
  refreshData: () => void
}

/**
 * AccountForm Component
 * 
 * This component provides an interface for users to create a new bank account.
 * It requires users to input their full name and an account number.
 * On successful account creation, data gets refreshed to reflect the changes.
 * Errors during the process, if any, are displayed using the ErrorBadge component.
 * 
 * @param {Props} props - Properties passed to the component.
 * @returns {React.ReactElement} The rendered JSX component.
 */
export default function AccountForm({ refreshData }: Props) {
  // State to store any error messages during account creation.
  const [error, setError] = useState<string>("")

  /**
   * Handles the form submission. It creates a new account using
   * the AccountService, and if successful, refreshes the data.
   * Otherwise, sets the error state with an error message.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    // Getting input values from the form.
    const nameInput = document.getElementById("name") as HTMLInputElement
    const numberInput = document.getElementById("number") as HTMLInputElement

    if (!nameInput || !numberInput) return

    try {
      await AccountService.create(nameInput.value, +numberInput.value)
      refreshData()
    } catch (e) {
      setError(e?.response?.data?.message || 'An error occurred during account creation.')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Heading for the form */}
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
        Create Account
      </Text>

      {/* Input fields for name and account number */}
      <Flex direction={"column"}>
        <TextField id="name" label="Full Name" />
        <TextField id="number" label="Account Number" type="number" />
        {/* Submit button for the form */}
        <Button size="small" variation="primary" type="submit">
          Create Account
        </Button>
      </Flex>

      {/* Warning message indicating the necessity of account registration */}
      <Flex justifyContent={"center"} marginTop={"1em"}>
        <Badge variation="warning">
          <Text variation="primary" fontSize=".8em" fontStyle="normal">
            Registering an account is mandatory to proceed.
          </Text>
        </Badge>
      </Flex>

      {/* Display error messages if any */}
      <ErrorBadge error={error} />
    </form>
  )
}
