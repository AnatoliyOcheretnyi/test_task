import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { TransactionItem } from '@/features/profile/types/account';
import { palette, radius, spacing, typography } from '@/shared/theme/tokens';

type TransactionRowProps = {
  item: TransactionItem;
  mode?: keyof typeof palette;
};

function getTransactionInitial(title: string) {
  return title.charAt(0).toUpperCase();
}

function TransactionRowComponent({ item, mode = 'light' }: TransactionRowProps) {
  const theme = palette[mode];

  return (
    <View style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: theme.avatarBackground }]}>
        <Text style={[styles.avatarText, { color: theme.titlePrimary }]}>
          {getTransactionInitial(item.title)}
        </Text>
      </View>
      <View style={styles.meta}>
        <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1}>
          {item.title}
        </Text>
        {item.subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={1}>
            {item.subtitle}
          </Text>
        ) : null}
      </View>
      <Text
        style={[
          styles.amount,
          { color: item.tone === 'success' ? theme.success : theme.textPrimary },
        ]}>
        {item.amount}
      </Text>
    </View>
  );
}

export const TransactionRow = memo(TransactionRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.captionSmall.fontSize,
    lineHeight: typography.captionSmall.lineHeight,
    fontWeight: '600',
    letterSpacing: typography.captionSmall.letterSpacing,
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: typography.captionBig.fontSize,
    lineHeight: typography.captionBig.lineHeight,
    fontWeight: typography.captionBig.fontWeight,
    letterSpacing: typography.captionBig.letterSpacing,
  },
  subtitle: {
    fontSize: typography.captionSmall.fontSize,
    lineHeight: typography.captionSmall.lineHeight,
    fontWeight: typography.captionSmall.fontWeight,
    letterSpacing: typography.captionSmall.letterSpacing,
  },
  amount: {
    fontSize: typography.captionBig.fontSize,
    lineHeight: typography.captionBig.lineHeight,
    fontWeight: typography.captionBig.fontWeight,
    letterSpacing: typography.captionBig.letterSpacing,
  },
});
