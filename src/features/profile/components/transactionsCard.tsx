import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { TransactionItem } from '@/features/profile/types/account';
import { TransactionRow } from '@/features/profile/components/transactionRow';
import { palette, shadow, typography } from '@/shared/theme/tokens';
import { text } from '@/text';

type TransactionsCardProps = {
  items: TransactionItem[];
  mode?: keyof typeof palette;
};

export function TransactionsCard({ items, mode = 'light' }: TransactionsCardProps) {
  const theme = palette[mode];

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: theme.textSecondary }]}>
          {text.profile.transactions.title}
        </Text>
        <View style={[styles.chevronWrap, { backgroundColor: theme.surfaceMuted }]}>
          <Ionicons color={theme.textPrimary} name="chevron-forward" size={14} />
        </View>
      </View>
      <View style={styles.list}>
        {items.map((item) => (
          <TransactionRow key={item.id} item={item} mode={mode} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    gap: 14,
    shadowColor: shadow.base,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: typography.captionSmall.fontSize,
    lineHeight: typography.captionSmall.lineHeight,
    fontWeight: '500',
    letterSpacing: typography.captionSmall.letterSpacing,
  },
  chevronWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: 24,
  },
});
