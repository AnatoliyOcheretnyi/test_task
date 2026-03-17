import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { palette, radius, spacing, typography } from '@/shared/theme/tokens';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onToggleSecureEntry?: () => void;
  error?: string;
  mode?: keyof typeof palette;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
};

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onToggleSecureEntry,
  error,
  mode = 'light',
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputProps) {
  const theme = palette[mode];
  const inputTextColor = mode === 'dark' ? theme.titleSecondary : theme.textPrimary;
  const inputLabelColor = mode === 'dark' ? theme.textSecondary : theme.textTertiary;
  const eyeColor = mode === 'dark' ? theme.buttonPrimary : theme.titlePrimary;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputShell,
          {
            backgroundColor: theme.surface,
            borderColor: error ? theme.danger : theme.surface,
            borderWidth: error ? 1 : 0,
          },
        ]}>
        <View style={styles.inputContent}>
          <Text style={[styles.label, { color: inputLabelColor }]}>{label}</Text>
          <TextInput
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={inputLabelColor}
            secureTextEntry={secureTextEntry}
            style={[styles.input, { color: inputTextColor }]}
            value={value}
          />
        </View>
        {onToggleSecureEntry ? (
          <Pressable hitSlop={12} onPress={onToggleSecureEntry} style={styles.iconButton}>
            <Ionicons
              color={eyeColor}
              name={secureTextEntry ? 'eye' : 'eye-off'}
              size={18}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={[styles.error, { color: theme.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 11,
  },
  inputShell: {
    height: 61,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  input: {
    flex: 1,
    fontSize: typography.inputFieldText.fontSize,
    lineHeight: typography.inputFieldText.lineHeight,
    fontWeight: typography.inputFieldText.fontWeight,
    letterSpacing: typography.inputFieldText.letterSpacing,
    paddingVertical: 0,
    margin: 0,
  },
  iconButton: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  error: {
    fontSize: 12,
  },
});
