// Enabling strict mode in JavaScript to catch common coding bugs and prevent usage of potentially problematic features.
"use strict";

// Importing necessary components and styles from AWS Amplify and other libraries.
import {
  Authenticator,
  Button,
  Card,
  Flex,
  translations
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";  // Incorporating the default styles of Amplify's UI components.
import "@/amplify-config";  // Importing Amplify's configuration file, which sets up the backend services.
import { I18n } from "aws-amplify";  // Using Amplify's I18n module for internationalization.

// Initializing translations and setting Spanish as the default language.
setupTranslations();

/**
 * Login Component.
 * Represents the main authentication interface of the application.
 * Provides functionalities like sign-in, sign-up, password reset, etc.
 *
 * @param {object} props - Input properties for the component.
 * @param {React.ReactNode} props.children - Child elements or components to render within the authenticator.
 * @returns {React.Component} The authenticator component with associated logic and UI.
 */
export default function Login({ children }: Props) {
  return (
    <>
      <Authenticator formFields={formFieldsConfig()}>
        {({ signOut, user }) => (
          <>
            <UserCard user={user} onSignOut={signOut} />
            {children}
          </>
        )}
      </Authenticator>
    </>
  );
}

/**
 * Initialize translations and set default language.
 * This function integrates the predefined translations and sets Spanish ('es') as the default language for the app.
 */
function setupTranslations() {
  I18n.putVocabularies(translations);
  I18n.setLanguage("es");
}

/**
 * Configures form fields used during the authentication process.
 *
 * @returns {object} Configuration settings for form fields based on the app's requirements.
 */
function formFieldsConfig() {
  // Individual form field configurations
  const usernameField = { placeholder: "Enter your username" };
  const confirmPasswordField = { placeholder: "Confirm your password" };
  const confirmationCodeField = { placeholder: "Enter your confirmation code" };

  // Configurations aggregated and mapped to corresponding authentication actions
  return {
    signIn: {
      username: usernameField,
    },
    signUp: {
      email: { order: 1 },
      username: usernameField,
      password: {},
      confirm_password: confirmPasswordField,
    },
    forceNewPassword: {
      password: {},
    },
    resetPassword: {
      username: usernameField,
    },
    confirmResetPassword: {
      confirmation_code: confirmationCodeField,
      confirm_password: confirmPasswordField,
    },
  };
}

/**
 * `UserCard` Component.
 * Displays a card component with the username of the currently authenticated user and provides an option to sign out.
 *
 * @param {object} props - Properties passed to this component.
 * @param {object} props.user - Data of the authenticated user.
 * @param {Function} props.onSignOut - Function to be triggered when user opts to sign out.
 * @returns {React.Component} A rendered card component with user details.
 */
function UserCard({ user, onSignOut }) {
  return (
    <Card variation="outlined" marginBottom={"1em"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        {user?.username}
        <Button size="small" onClick={onSignOut}>
          Sign Out
        </Button>
      </Flex>
    </Card>
  );
}

// Prop types definition for the Login component.
interface Props {
  children: React.ReactNode;
}
