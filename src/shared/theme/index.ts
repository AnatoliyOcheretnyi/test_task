import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

import { palette } from '@/shared/theme/tokens';

export type AppThemeMode = keyof typeof palette;

export const appThemes: Record<AppThemeMode, Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: palette.light.buttonPrimary,
      background: palette.light.background,
      card: palette.light.surface,
      text: palette.light.textPrimary,
      border: palette.light.border,
      notification: palette.light.buttonPrimary,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: palette.dark.buttonPrimary,
      background: palette.dark.background,
      card: palette.dark.surface,
      text: palette.dark.textPrimary,
      border: palette.dark.border,
      notification: palette.dark.buttonPrimary,
    },
  },
};
