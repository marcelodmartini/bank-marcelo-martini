import { Amplify, Auth } from "aws-amplify";
import { config } from 'dotenv';

/**
 * Initialize and configure Amplify.
 * 
 * This configuration sets up AWS Amplify to work with Amazon Cognito for
 * authentication and configures an API endpoint for making HTTP requests.
 */
config();
configureAmplify();

/**
 * Configures Amplify with settings for authentication and API endpoints.
 */
function configureAmplify() {
  Amplify.configure({
    Auth: getAuthConfiguration(),
    API: {
      endpoints: [
        getApiEndpointConfiguration(),
      ],
    },
  });
}

/**
 * Returns the configuration settings for Amazon Cognito authentication.
 * 
 * @returns {object} The authentication configuration.
 */
function getAuthConfiguration() {
  return {
    region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  };
}

/**
 * Returns the configuration settings for the API endpoint.
 * 
 * @returns {object} The API endpoint configuration.
 */
function getApiEndpointConfiguration() {
  return {
    name: "api",
    endpoint: process.env.NEXT_PUBLIC_API_URL,
    custom_header: generateCustomHeaders,
  };
}

/**
 * Generates custom headers for the API endpoint.
 * 
 * This function retrieves the JWT token from the current session and uses
 * it to create an Authorization header.
 * 
 * @returns {Promise<object>} A promise that resolves to an object containing the Authorization header.
 */
async function generateCustomHeaders() {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  return { Authorization: `Bearer ${token}` };
}
