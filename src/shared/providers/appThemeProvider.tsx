import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { palette } from '@/shared/theme/tokens';

export type AppThemeMode = keyof typeof palette;

const DEFAULT_APP_THEME_MODE: AppThemeMode = 'light';

type AppThemeContextValue = {
  mode: AppThemeMode;
  setMode: (mode: AppThemeMode) => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<AppThemeMode>(DEFAULT_APP_THEME_MODE);

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }

  return context;
}
