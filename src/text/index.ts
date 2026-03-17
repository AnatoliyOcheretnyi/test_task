export const text = {
  onboarding: {
    skip: 'Skip',
    next: 'Next',
    finish: 'Get started',
    slides: [
      {
        title: 'You ought to know where your money goes',
        description:
          'Get an overview of how you are performing and motivate yourself to achieve even more.',
      },
      {
        title: 'Track spending in one simple place',
        description:
          'Follow your day to day activity with clear categories, balances, and recent updates.',
      },
      {
        title: 'Stay focused on every financial goal',
        description:
          'See progress at a glance and keep momentum with a flow that is easy to understand.',
      },
      {
        title: 'Create your account and get started',
        description:
          'Set up your profile in a minute and move straight into your personal account overview.',
      },
    ],
  },
  common: {
    close: 'Close',
    notAvailable: 'N/A',
  },
  signup: {
    title: 'Create account',
    subtitle: 'Complete the sign up to get started',
    fields: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      name: 'Louis Real',
      email: 'Louis04real@gmail.com',
      password: '..............',
    },
    terms: {
      prefix: 'By signing up, you agree to the ',
      termsOfService: 'Terms of Service',
      and: ' and ',
      privacyPolicy: 'Privacy Policy',
    },
    footer: {
      prefix: 'Already have an account? ',
      action: 'Sign in',
    },
    actions: {
      createAccount: 'Create account',
    },
    loading: {
      creatingAccount: 'Creating your account',
      gettingAccountDetails: 'Getting account details',
    },
    errors: {
      missingCredentials: 'Signup succeeded but account credentials were not returned',
      createAccountTitle: "We couldn't create your account",
      createAccountDescription:
        'Something went wrong while creating your account. Please try again later.',
      fallbackCreateAccount: 'Could not create account',
    },
  },
  profile: {
    title: 'My Account',
    bankName: 'Kuda Bank',
    summary: {
      accountType: 'Type of account',
      accountNumber: 'Account No',
      availableBalance: 'Available Balance',
      dateAdded: 'Date added',
    },
    transactions: {
      title: 'Recent Transactions',
      fallbackItemTitle: 'Item',
    },
    errors: {
      accountDetailsTitle: "We couldn't load account details",
      accountDetailsDescription:
        'Your account was created, but we could not fetch the latest details yet.',
      accountDetailsFallback: 'We could not load your account details right now.',
      retry: 'Try again',
    },
  },
  validation: {
    signup: {
      enterName: 'Enter your name',
      shortName: 'Name must be at least 2 characters',
      invalidName: 'Use only letters, spaces, apostrophes, and hyphens',
      enterEmail: 'Enter your email',
      invalidEmail: 'Enter a valid email',
      enterPassword: 'Enter your password',
      passwordLength: 'Password must be 8 to 64 characters',
      passwordUppercase: 'Add at least 1 uppercase letter',
      passwordLowercase: 'Add at least 1 lowercase letter',
      passwordDigit: 'Add at least 1 number',
      acceptTerms: 'You need to accept the terms',
    },
  },
} as const;
