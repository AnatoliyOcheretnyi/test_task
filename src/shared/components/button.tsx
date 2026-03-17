import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { palette, radius, spacing, typography } from '@/shared/theme/tokens';

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  mode?: keyof typeof palette;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  mode = 'light',
  variant = 'primary',
}: ButtonProps) {
  const theme = palette[mode];

  const backgroundColor =
    variant === 'primary'
      ? theme.buttonPrimary
      : variant === 'secondary'
        ? theme.buttonSecondary
        : theme.buttonTertiary;

  const textColor =
    variant === 'primary'
      ? theme.buttonPrimaryText
      : variant === 'secondary'
        ? theme.buttonSecondaryText
        : theme.buttonTertiaryText;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: disabled ? 0.45 : pressed ? 0.85 : 1 },
      ]}>
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  label: {
    fontSize: typography.buttonPrimary.fontSize,
    lineHeight: typography.buttonPrimary.lineHeight,
    fontWeight: typography.buttonPrimary.fontWeight,
    letterSpacing: typography.buttonPrimary.letterSpacing,
  },
});
