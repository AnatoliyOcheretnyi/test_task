import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, type ListRenderItem } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {
  OnboardingSlideCard,
  type OnboardingSlide,
} from '@/features/auth/components';
import { Button, PageIndicator, Screen } from '@/shared/components';
import type { AuthScreenProps } from '@/shared/navigation/navigationTypes';
import { AuthRoutes } from '@/shared/navigation/navigationTypes';
import { useAppSession, useAppTheme } from '@/shared/providers';
import { palette, shadow, spacing, typography } from '@/shared/theme/tokens';
import { text } from '@/text';

const CARD_WIDTH = 335;
const CARD_HORIZONTAL_PADDING = 24;
const SLIDE_WIDTH = CARD_WIDTH - CARD_HORIZONTAL_PADDING * 2;
const SCROLL_EVENT_THROTTLE = 16;
const ONBOARDING_ILLUSTRATION = require('@/assets/images/Illustrations.webp');
const ONBOARDING_SLIDES = text.onboarding.slides;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<OnboardingSlide>);

function getSlideItemLayout(_: ArrayLike<OnboardingSlide> | null | undefined, index: number) {
  return {
    index,
    length: SLIDE_WIDTH,
    offset: SLIDE_WIDTH * index,
  };
}

function getSlideKey(_: OnboardingSlide, index: number) {
  return String(index);
}

export default function OnboardingScreen({
  navigation,
}: AuthScreenProps<AuthRoutes.ONBOARDING>) {
  const { mode } = useAppTheme();
  const theme = palette[mode];
  const { finishOnboarding } = useAppSession();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const progress = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      progress.value = event.contentOffset.x / SLIDE_WIDTH;
    },
  });

  const completeOnboarding = useCallback(async () => {
    await finishOnboarding();
    navigation.replace(AuthRoutes.SIGNUP);
  }, [finishOnboarding, navigation]);

  const handleContinue = useCallback(async () => {
    if (!isLastSlide) {
      listRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      return;
    }

    await completeOnboarding();
  }, [completeOnboarding, currentIndex, isLastSlide]);

  const handleMomentumScrollEnd = useCallback((event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    setCurrentIndex(nextIndex);
  }, []);

  const renderSlide = useCallback<ListRenderItem<OnboardingSlide>>(
    ({ item }) => (
      <OnboardingSlideCard item={item} mode={mode} width={SLIDE_WIDTH} />
    ),
    [mode],
  );

  return (
    <Screen mode={mode} style={styles.screen}>
      <View style={styles.topRow}>
        <View />
        <Pressable onPress={completeOnboarding} style={[styles.skipButton, { backgroundColor: theme.surface }]}>
          <Text style={[styles.skipLabel, { color: theme.textPrimary }]}>{text.onboarding.skip}</Text>
        </Pressable>
      </View>

      <View style={styles.illustrationArea}>
        <Image
          contentFit="contain"
          source={ONBOARDING_ILLUSTRATION}
          style={styles.illustration}
        />
      </View>

      <View style={[styles.bottomCard, { backgroundColor: theme.surface }]}>
        <AnimatedFlatList
          data={ONBOARDING_SLIDES}
          getItemLayout={getSlideItemLayout}
          horizontal
          keyExtractor={getSlideKey}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={onScroll}
          pagingEnabled
          ref={listRef}
          renderItem={renderSlide}
          scrollEventThrottle={SCROLL_EVENT_THROTTLE}
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
        />
        <View style={styles.indicatorWrap}>
          <PageIndicator mode={mode} progress={progress} total={ONBOARDING_SLIDES.length} />
        </View>
        <View style={styles.buttonWrap}>
          <Button
            label={isLastSlide ? text.onboarding.finish : text.onboarding.next}
            mode={mode}
            onPress={handleContinue}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    minWidth: 61,
    minHeight: 33,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: {
    fontSize: typography.buttonSmall.fontSize,
    lineHeight: typography.buttonSmall.lineHeight,
    fontWeight: typography.buttonSmall.fontWeight,
    letterSpacing: typography.buttonSmall.letterSpacing,
    textAlign: 'center',
  },
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginTop: spacing.md,
  },
  illustration: {
    width: 420,
    height: 360,
  },
  bottomCard: {
    alignSelf: 'center',
    width: CARD_WIDTH,
    height: 343,
    borderRadius: 48,
    paddingTop: 36,
    paddingRight: 24,
    paddingBottom: 36,
    paddingLeft: 24,
    justifyContent: 'flex-end',
    marginTop: 'auto',
    marginBottom: 0,
    shadowColor: shadow.base,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  slider: {
    flexGrow: 0,
  },
  indicatorWrap: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 26,
  },
  buttonWrap: {
    marginTop: 0,
  },
});
