import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_SEEN_ONBOARDING_KEY = 'has-seen-onboarding';

export async function getHasSeenOnboarding() {
  const value = await AsyncStorage.getItem(HAS_SEEN_ONBOARDING_KEY);
  return value === 'true';
}

export function setHasSeenOnboarding() {
  return AsyncStorage.setItem(HAS_SEEN_ONBOARDING_KEY, 'true');
}
