export type AccountTransaction = {
  amount: number;
  bank: string;
  name: string;
  time: string;
};

export type AccountCredentials = {
  username: string;
  password: string;
};

export type AccountMeta = {
  status: 'ready' | 'unavailable';
  errorMessage?: string;
  credentials?: AccountCredentials;
};

export type AccountPayload = {
  accountNumber?: string;
  accountType?: string;
  availableBalance?: number;
  currency?: string;
  dateAdded?: string;
  transactions?: AccountTransaction[];
  meta?: AccountMeta;
  [key: string]: unknown;
};

export type KeyValueRow = {
  label: string;
  value: string;
  tone?: 'default' | 'success';
};

export type TransactionItem = {
  id: string;
  title: string;
  subtitle?: string;
  amount: string;
  tone?: 'default' | 'success';
};
