import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, typography } from '@/shared/theme/tokens';

export type OnboardingSlide = {
  title: string;
  description: string;
};

type OnboardingSlideCardProps = {
  item: OnboardingSlide;
  mode?: keyof typeof palette;
  width: number;
};

function OnboardingSlideCardComponent({
  item,
  mode = 'light',
  width,
}: OnboardingSlideCardProps) {
  const theme = palette[mode];

  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: theme.titlePrimary }]}>{item.title}</Text>
        <Text style={[styles.body, { color: theme.textSecondary }]}>{item.description}</Text>
      </View>
    </View>
  );
}

export const OnboardingSlideCard = memo(OnboardingSlideCardComponent);

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
  },
  textBlock: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: typography.titleH2.fontSize,
    lineHeight: typography.titleH2.lineHeight,
    textAlign: 'center',
    fontWeight: typography.titleH2.fontWeight,
    letterSpacing: typography.titleH2.letterSpacing,
  },
  body: {
    fontSize: typography.bodyOnboarding.fontSize,
    lineHeight: typography.bodyOnboarding.lineHeight,
    textAlign: 'center',
    paddingHorizontal: 22,
    marginTop: 8,
    fontWeight: typography.bodyOnboarding.fontWeight,
    letterSpacing: typography.bodyOnboarding.letterSpacing,
  },
});
