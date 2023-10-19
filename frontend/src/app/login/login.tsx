// Indicate that this file uses JavaScript's "strict mode".
"use strict";

// Import required components and styles from Amplify and other dependencies.
import {
  Authenticator,
  Button,
  Card,
  Flex,
  translations
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@/amplify-config";
import { I18n } from "aws-amplify";

// Set up translations and language for the I18n module.
setupTranslations();

/**
 * Login Component.
 * 
 * This component provides an authentication interface for the user.
 * It allows the user to sign in, sign up, reset password, among other actions.
 * 
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components that will be rendered within the authenticator.
 * @returns {React.Component} The rendered authentication component.
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
 * Set up translations and language.
 */
function setupTranslations() {
  I18n.putVocabularies(translations);
  I18n.setLanguage("es");
}

/**
 * Generate the form fields configuration.
 * 
 * @returns {object} The form fields configuration.
 */
function formFieldsConfig() {
  const usernameField = { placeholder: "Enter your username" };
  const confirmPasswordField = { placeholder: "Confirm your password" };
  const confirmationCodeField = { placeholder: "Enter your confirmation code" };

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
 * Render a card with user information and a sign out button.
 * 
 * @param {object} props - Component properties.
 * @param {object} props.user - Information of the currently authenticated user.
 * @param {Function} props.onSignOut - Function to execute when the sign out button is clicked.
 * @returns {React.Component} The rendered user card component.
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

interface Props {
  children: React.ReactNode;
}
