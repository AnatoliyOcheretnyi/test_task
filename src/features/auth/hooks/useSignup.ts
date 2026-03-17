import { useCallback, useState } from "react";

import { fetchAccountDetails, signup } from "@/features/auth/services/authApi";
import {
  validateSignup,
  type SignupErrors,
  type SignupValues,
} from "@/features/auth/utils";
import { useAppSession } from '@/shared/providers';
import { text } from "@/text";

const INITIAL_SIGNUP_VALUES: SignupValues = {
  name: '',
  email: '',
  password: '',
  acceptedTerms: false,
};

export function useSignup() {
  const { setAccount } = useAppSession();
  const [values, setValues] = useState<SignupValues>(INITIAL_SIGNUP_VALUES);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [secureEntry, setSecureEntry] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const updateValue = useCallback(
    <Key extends keyof SignupValues>(key: Key, value: SignupValues[Key]) => {
      setValues((current) => ({ ...current, [key]: value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    },
    [],
  );

  const updateName = useCallback((value: string) => {
    updateValue("name", value);
  }, [updateValue]);

  const updateEmail = useCallback((value: string) => {
    updateValue("email", value);
  }, [updateValue]);

  const updatePassword = useCallback((value: string) => {
    updateValue("password", value);
  }, [updateValue]);

  const toggleAcceptedTerms = useCallback(() => {
    updateValue("acceptedTerms", !values.acceptedTerms);
  }, [updateValue, values.acceptedTerms]);

  const toggleSecureEntry = useCallback(() => {
    setSecureEntry((current) => !current);
  }, []);

  const dismissSubmitError = useCallback(() => {
    setSubmitError("");
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateSignup(values);
    setErrors(validationErrors);
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setLoadingMessage(text.signup.loading.creatingAccount);

    try {
      const signupResponse = await signup({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      if (!signupResponse.basicAuthCredentials) {
        throw new Error(text.signup.errors.missingCredentials);
      }

      try {
        setLoadingMessage(text.signup.loading.gettingAccountDetails);

        const accountResponse = await fetchAccountDetails(
          signupResponse.basicAuthCredentials,
        );

        setAccount({
          ...accountResponse,
          meta: {
            status: "ready",
            credentials: signupResponse.basicAuthCredentials,
          },
        });
      } catch (error) {
        setAccount({
          meta: {
            status: "unavailable",
            errorMessage:
              error instanceof Error
                ? error.message
                : text.profile.errors.accountDetailsFallback,
            credentials: signupResponse.basicAuthCredentials,
          },
        });
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : text.signup.errors.fallbackCreateAccount,
      );
    } finally {
      setSubmitting(false);
      setLoadingMessage("");
    }
  }, [setAccount, values]);

  return {
    dismissSubmitError,
    errors,
    handleSubmit,
    loadingMessage,
    secureEntry,
    submitError,
    submitting,
    toggleAcceptedTerms,
    toggleSecureEntry,
    updateEmail,
    updateName,
    updatePassword,
    values,
  };
}
