import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import type { AccountPayload } from '@/features/profile/types/account';
import { getHasSeenOnboarding, setHasSeenOnboarding } from '@/shared/services/storage';

type AppSessionContextValue = {
  bootstrapped: boolean;
  hasSeenOnboarding: boolean;
  account: AccountPayload | null;
  finishOnboarding: () => Promise<void>;
  setAccount: (payload: AccountPayload | null) => void;
};

const AppSessionContext = createContext<AppSessionContextValue | null>(null);

export function AppSessionProvider({ children }: PropsWithChildren) {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(false);
  const [account, setAccount] = useState<AccountPayload | null>(null);

  useEffect(() => {
    let active = true;

    getHasSeenOnboarding()
      .then((value) => {
        if (!active) {
          return;
        }

        setHasSeenOnboardingState(value);
      })
      .finally(() => {
        if (active) {
          setBootstrapped(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const finishOnboarding = useCallback(async () => {
    await setHasSeenOnboarding();
    setHasSeenOnboardingState(true);
  }, []);

  const value = useMemo(
    () => ({
      bootstrapped,
      hasSeenOnboarding,
      account,
      finishOnboarding,
      setAccount,
    }),
    [account, bootstrapped, finishOnboarding, hasSeenOnboarding],
  );

  return <AppSessionContext.Provider value={value}>{children}</AppSessionContext.Provider>;
}

export function useAppSession() {
  const context = useContext(AppSessionContext);

  if (!context) {
    throw new Error('useAppSession must be used within AppSessionProvider');
  }

  return context;
}
