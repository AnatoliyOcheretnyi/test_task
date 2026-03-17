import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { fetchAccountDetails } from '@/features/auth/services/authApi';
import { SummaryCard, TransactionsCard } from '@/features/profile/components';
import { buildAccountSummary, buildTransactions } from '@/features/profile/utils';
import { ErrorState, Screen } from '@/shared/components';
import type { AppScreenProps } from '@/shared/navigation/navigationTypes';
import { AppRoutes } from '@/shared/navigation/navigationTypes';
import { useAppSession, useAppTheme } from '@/shared/providers';
import { palette, radius, spacing, typography } from '@/shared/theme/tokens';
import { text } from '@/text';

export default function AccountScreen(_: AppScreenProps<AppRoutes.ACCOUNT>) {
  const { mode } = useAppTheme();
  const theme = palette[mode];
  const { account, setAccount } = useAppSession();
  const [retrying, setRetrying] = useState(false);

  const summaryRows = account ? buildAccountSummary(account) : [];
  const transactions = account ? buildTransactions(account) : [];
  const bankName = text.profile.bankName;
  const isUnavailable = account?.meta?.status === 'unavailable';
  const bankLogoSource =
    mode === 'dark' ? require('@/assets/images/bank_dark.webp') : require('@/assets/images/bank_light.webp');
  const bankLogoBackground = mode === 'dark' ? '#FFFFFF' : '#41276D';

  async function handleRetry() {
    const credentials = account?.meta?.credentials;

    if (!credentials) {
      return;
    }

    setRetrying(true);

    try {
      const accountResponse = await fetchAccountDetails(credentials);

      setAccount({
        ...accountResponse,
        meta: {
          status: 'ready',
          credentials,
        },
      });
    } catch (error) {
      setAccount({
        meta: {
          status: 'unavailable',
          credentials,
          errorMessage:
            error instanceof Error
              ? error.message
              : text.profile.errors.accountDetailsFallback,
        },
      });
    } finally {
      setRetrying(false);
    }
  }

  return (
    <Screen mode={mode}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
          <View style={styles.headerSide} />
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>{text.profile.title}</Text>
          <View style={styles.headerSide} />
        </View>

        {!isUnavailable ? (
          <View style={styles.bankHeader}>
            <View style={[styles.bankLogoWrap, { backgroundColor: bankLogoBackground }]}>
              <Image contentFit="contain" source={bankLogoSource} style={styles.bankLogo} />
            </View>
            <Text style={[styles.bankName, { color: theme.textPrimary }]}>{bankName}</Text>
          </View>
        ) : null}

        {isUnavailable ? (
          <ErrorState
            actionLabel={text.profile.errors.retry}
            actionLoading={retrying}
            description={`${text.profile.errors.accountDetailsDescription}${
              account?.meta?.errorMessage ? ` ${account.meta.errorMessage}` : ''
            }`}
            mode={mode}
            onAction={handleRetry}
            title={text.profile.errors.accountDetailsTitle}
          />
        ) : null}

        {!isUnavailable && summaryRows.length > 0 ? <SummaryCard mode={mode} rows={summaryRows} /> : null}
        {!isUnavailable && transactions.length > 0 ? (
          <TransactionsCard items={transactions} mode={mode} />
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
    paddingBottom: spacing.xxxl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  headerSide: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: typography.titleH3.fontSize,
    lineHeight: typography.titleH3.lineHeight,
    fontWeight: typography.titleH3.fontWeight,
    letterSpacing: typography.titleH3.letterSpacing,
  },
  bankHeader: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  bankLogoWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankLogo: {
    width: 18,
    height: 20,
  },
  bankName: {
    fontSize: typography.captionBig.fontSize,
    lineHeight: typography.captionBig.lineHeight,
    fontWeight: typography.captionBig.fontWeight,
    letterSpacing: typography.captionBig.letterSpacing,
  },
});
