"use client"

// Importing necessary components from the AWS Amplify UI library.
import { Badge, Flex, Text } from "@aws-amplify/ui-react"

interface Props {
  // An optional error message string that will be displayed if provided.
  error?: string
}

/**
 * ErrorBadge Component
 * 
 * This component provides a user interface to display error messages
 * using a stylized badge. The badge will only be rendered if there's
 * an error message provided in the `error` prop.
 * 
 * @param {Props} props - Properties passed to the component, specifically the error message.
 * @returns {React.ReactElement | null} The rendered JSX component or null.
 */
export default function ErrorBadge({ error }: Props) {
  // If there's no error message, don't render the badge.
  if (!error) return null

  // Render the error badge with the given error message.
  return (
    <Flex justifyContent="center" marginTop={10}>
      <Badge variation="error">
        <Text>{error}</Text>
      </Badge>
    </Flex>
  )
}
