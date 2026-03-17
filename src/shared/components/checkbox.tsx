import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { palette, spacing } from '@/shared/theme/tokens';

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  label: React.ReactNode;
  error?: string;
  mode?: keyof typeof palette;
};

export function Checkbox({ checked, onPress, label, error, mode = 'light' }: CheckboxProps) {
  const theme = palette[mode];

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress} style={styles.row}>
        <View
          style={[
            styles.box,
            {
              borderColor: error ? theme.danger : theme.border,
              backgroundColor: checked ? theme.buttonPrimary : theme.surface,
            },
          ]}>
          {checked ? <Ionicons color={theme.buttonPrimaryText} name="checkmark" size={14} /> : null}
        </View>
        <View style={styles.label}>{label}</View>
      </Pressable>
      {error ? <Text style={[styles.error, { color: theme.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  label: {
    flex: 1,
  },
  error: {
    fontSize: 12,
  },
});
