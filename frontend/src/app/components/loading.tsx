"use client"

// Import necessary components from the AWS Amplify UI library.
import { Card, Flex, Loader } from "@aws-amplify/ui-react"

/**
 * Loading Component
 * 
 * This component displays a loading animation inside a card.
 * It is meant to be used to indicate to the user that some data or 
 * content is currently being loaded.
 * 
 * @returns {React.ReactElement} The rendered JSX component.
 */
export default function Loading() {
  return (
    <Card variation="outlined" height={100}>
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Loader size="large" />
      </Flex>
    </Card>
  )
}
