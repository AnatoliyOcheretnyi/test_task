import { validateSignup, type SignupValues } from '@/features/auth/utils';

describe('validateSignup', () => {
  const validValues: SignupValues = {
    name: 'Anna-Maria',
    email: 'anna@example.com',
    password: 'SecurePass1',
    acceptedTerms: true,
  };

  it('returns no errors for valid values', () => {
    expect(validateSignup(validValues)).toEqual({});
  });

  it('returns field errors for invalid form values', () => {
    expect(
      validateSignup({
        name: '1',
        email: 'not-an-email',
        password: 'password',
        acceptedTerms: false,
      }),
    ).toEqual({
      name: 'Name must be at least 2 characters',
      email: 'Enter a valid email',
      password: 'Add at least 1 uppercase letter',
      acceptedTerms: 'You need to accept the terms',
    });
  });

  it('allows names with spaces, apostrophes, and hyphens', () => {
    expect(
      validateSignup({
        ...validValues,
        name: "Mary Jane O'Connor-Smith",
      }),
    ).toEqual({});
  });
});
