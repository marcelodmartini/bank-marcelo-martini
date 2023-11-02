"use client"

// Import necessary components from the AWS Amplify UI library.
import { Card, Flex, Loader } from "@aws-amplify/ui-react";

/**
 * Loading Component.
 * 
 * This component displays a loading animation inside a card.
 * It is designed to provide visual feedback to the user, indicating
 * that data or content is in the process of being loaded.
 * 
 * @returns {React.ReactElement} A rendered JSX component displaying the loading animation.
 */
export default function Loading() {
  return (
    <Card variation="outlined" height={100}>
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Loader size="large" />
      </Flex>
    </Card>
  );
}
