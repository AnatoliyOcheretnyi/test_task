import type { AccountCredentials, AccountPayload } from '@/features/profile/types/account';

export const SIGNUP_ENDPOINT = 'https://artjoms-spole.fly.dev/signup';
export const ACCOUNT_ENDPOINT = 'https://artjoms-spole.fly.dev/interview/account';

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  message?: string;
  nextStep?: string;
  basicAuthCredentials?: AccountCredentials;
};

function encodeBase64(value: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let index = 0;

  while (index < value.length) {
    const first = value.charCodeAt(index++);
    const secondIndex = index++;
    const thirdIndex = index++;
    const hasSecond = secondIndex < value.length;
    const hasThird = thirdIndex < value.length;
    const second = hasSecond ? value.charCodeAt(secondIndex) : 0;
    const third = hasThird ? value.charCodeAt(thirdIndex) : 0;

    const block = (first << 16) | (second << 8) | third;

    output += chars[(block >> 18) & 63];
    output += chars[(block >> 12) & 63];
    output += hasSecond ? chars[(block >> 6) & 63] : '=';
    output += hasThird ? chars[block & 63] : '=';
  }

  return output;
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return (await response.json()) as Record<string, unknown>;
  }

  return { message: await response.text() };
}

export async function signup(payload: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(SIGNUP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const body = (await parseResponseBody(response)) as SignupResponse;

  if (!response.ok) {
    const message =
      typeof body.message === 'string'
        ? body.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return body;
}

export async function fetchAccountDetails(credentials: AccountCredentials): Promise<AccountPayload> {
  const response = await fetch(ACCOUNT_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${encodeBase64(`${credentials.username}:${credentials.password}`)}`,
    },
  });

  const body = (await parseResponseBody(response)) as AccountPayload;

  if (!response.ok) {
    const message =
      typeof body.message === 'string'
        ? body.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return body;
}
