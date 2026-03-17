import { fireEvent, render, waitFor } from '@testing-library/react-native';

import SignupScreen from '@/features/auth/screens/signupScreen';
import * as authApi from '@/features/auth/services/authApi';
import * as validateSignupModule from '@/features/auth/utils/validateSignup';

const mockSetAccount = jest.fn();

jest.mock('@/shared/providers/appSessionProvider', () => ({
  useAppSession: () => ({
    setAccount: mockSetAccount,
  }),
}));

jest.mock('@/shared/providers/appThemeProvider', () => ({
  useAppTheme: () => ({
    mode: 'light',
    setMode: jest.fn(),
  }),
}));

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows an error overlay when signup fails', async () => {
    jest.spyOn(authApi, 'signup').mockRejectedValueOnce(new Error('Service unavailable'));
    const fetchAccountSpy = jest.spyOn(authApi, 'fetchAccountDetails');
    jest.spyOn(validateSignupModule, 'validateSignup').mockReturnValue({});

    const screen = render(<SignupScreen />);

    fireEvent.press(screen.getAllByText('Create account')[1]);

    expect(await screen.findByText("We couldn't create your account")).toBeTruthy();
    expect(
      screen.getByText('Something went wrong while creating your account. Please try again later.'),
    ).toBeTruthy();

    expect(fetchAccountSpy).not.toHaveBeenCalled();
    expect(mockSetAccount).not.toHaveBeenCalled();

    fireEvent.press(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText("We couldn't create your account")).toBeNull();
    });
  });
});
