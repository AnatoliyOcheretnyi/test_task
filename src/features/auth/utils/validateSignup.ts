import { text } from '@/text';

const emailPattern =
  /^(?=.{6,254}$)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const namePattern = /^[\p{L}][\p{L}\s'-]*[\p{L}]$/u;
const passwordLengthPattern = /^.{8,64}$/;
const passwordUppercasePattern = /[A-Z]/;
const passwordLowercasePattern = /[a-z]/;
const passwordDigitPattern = /\d/;

export type SignupValues = {
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};

export type SignupErrors = Partial<Record<keyof SignupValues, string>>;

export function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const validationText = text.validation.signup;

  if (!trimmedName) {
    errors.name = validationText.enterName;
  } else if (trimmedName.length < 2) {
    errors.name = validationText.shortName;
  } else if (!namePattern.test(trimmedName)) {
    errors.name = validationText.invalidName;
  }

  if (!trimmedEmail) {
    errors.email = validationText.enterEmail;
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = validationText.invalidEmail;
  }

  if (!values.password) {
    errors.password = validationText.enterPassword;
  } else if (!passwordLengthPattern.test(values.password)) {
    errors.password = validationText.passwordLength;
  } else if (!passwordUppercasePattern.test(values.password)) {
    errors.password = validationText.passwordUppercase;
  } else if (!passwordLowercasePattern.test(values.password)) {
    errors.password = validationText.passwordLowercase;
  } else if (!passwordDigitPattern.test(values.password)) {
    errors.password = validationText.passwordDigit;
  }

  if (!values.acceptedTerms) {
    errors.acceptedTerms = validationText.acceptTerms;
  }

  return errors;
}
