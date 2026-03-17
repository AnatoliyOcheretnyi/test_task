import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { KeyValueRow } from '@/features/profile/types/account';
import { palette, spacing, typography } from '@/shared/theme/tokens';

type SummaryRowProps = {
  row: KeyValueRow;
  mode?: keyof typeof palette;
};

function SummaryRowComponent({ row, mode = 'light' }: SummaryRowProps) {
  const theme = palette[mode];

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{row.label}</Text>
      <Text
        style={[
          styles.value,
          { color: row.tone === 'success' ? theme.success : theme.textPrimary },
        ]}>
        {row.value}
      </Text>
    </View>
  );
}

export const SummaryRow = memo(SummaryRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  label: {
    fontSize: typography.captionBig.fontSize,
    lineHeight: typography.captionBig.lineHeight,
    fontWeight: typography.captionBig.fontWeight,
    letterSpacing: typography.captionBig.letterSpacing,
  },
  value: {
    fontSize: typography.captionBig.fontSize,
    lineHeight: typography.captionBig.lineHeight,
    fontWeight: typography.captionBig.fontWeight,
    letterSpacing: typography.captionBig.letterSpacing,
    flexShrink: 1,
    textAlign: 'right',
  },
});
