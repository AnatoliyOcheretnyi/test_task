import { StyleSheet, View } from 'react-native';

import type { KeyValueRow } from '@/features/profile/types/account';
import { SummaryRow } from '@/features/profile/components/summaryRow';
import { palette, shadow } from '@/shared/theme/tokens';

type SummaryCardProps = {
  rows: KeyValueRow[];
  mode?: keyof typeof palette;
};

export function SummaryCard({ rows, mode = 'light' }: SummaryCardProps) {
  const theme = palette[mode];

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {rows.map((row) => (
        <SummaryRow key={row.label} mode={mode} row={row} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: shadow.base,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
  },
});
