import type { AccountPayload, KeyValueRow, TransactionItem } from '@/features/profile/types/account';
import { text } from '@/text';

function formatCurrency(amount: number, currency: string) {
  const value = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  const currencySymbol = currency === 'NGN' ? 'N' : `${currency} `;
  const sign = amount < 0 ? '-' : '+';

  return `${sign}${currencySymbol}${value}`;
}

export function buildAccountSummary(payload: AccountPayload): KeyValueRow[] {
  return [
    {
      label: text.profile.summary.accountType,
      value: payload.accountType ?? text.common.notAvailable,
    },
    {
      label: text.profile.summary.accountNumber,
      value: payload.accountNumber ?? text.common.notAvailable,
    },
    {
      label: text.profile.summary.availableBalance,
      value:
        typeof payload.availableBalance === 'number'
          ? formatCurrency(payload.availableBalance, payload.currency ?? 'NGN').replace(/^\+/, '')
          : text.common.notAvailable,
      tone: 'success',
    },
    {
      label: text.profile.summary.dateAdded,
      value: payload.dateAdded ?? text.common.notAvailable,
    },
  ];
}

export function buildTransactions(payload: AccountPayload): TransactionItem[] {
  const candidates = payload.transactions;

  if (!Array.isArray(candidates)) {
    return [];
  }

  return candidates.slice(0, 5).map((item, index) => {
    if (!item || typeof item !== 'object') {
      return {
        id: String(index),
        title: `${text.profile.transactions.fallbackItemTitle} ${index + 1}`,
        amount: text.common.notAvailable,
        tone: 'default',
      };
    }

    return {
      id: String(index),
      title:
        typeof item.name === 'string'
          ? item.name
          : `${text.profile.transactions.fallbackItemTitle} ${index + 1}`,
      subtitle:
        typeof item.bank === 'string' && typeof item.time === 'string'
          ? `${item.bank} ${item.time}`
          : undefined,
      amount:
        typeof item.amount === 'number'
          ? formatCurrency(item.amount, payload.currency ?? 'NGN')
          : text.common.notAvailable,
      tone: typeof item.amount === 'number' && item.amount > 0 ? 'success' : 'default',
    };
  });
}
