import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { palette, radius, shadow, spacing, typography } from '@/shared/theme/tokens';

type LoadingOverlayProps = {
  visible: boolean;
  message: string;
  mode?: keyof typeof palette;
};

type LoadingDotProps = {
  delay: number;
  mode: keyof typeof palette;
};

function LoadingDot({ delay, mode }: LoadingDotProps) {
  const theme = palette[mode];
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 280 }),
          withTiming(0.7, { duration: 280 }),
        ),
        -1,
        false,
      ),
    );

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 280 }),
          withTiming(0.35, { duration: 280 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[styles.dot, animatedStyle, { backgroundColor: theme.buttonPrimary }]} />;
}

export function LoadingOverlay({
  visible,
  message,
  mode = 'light',
}: LoadingOverlayProps) {
  const theme = palette[mode];

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.overlay, { backgroundColor: theme.modalOverlay }]}>
      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <View style={styles.spinnerWrap}>
          <LoadingDot delay={0} mode={mode} />
          <LoadingDot delay={180} mode={mode} />
          <LoadingDot delay={360} mode={mode} />
        </View>
        <Text style={[styles.message, { color: theme.textPrimary }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 18,
    shadowColor: shadow.base,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  spinnerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 22,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
  },
  message: {
    fontSize: typography.bodyText.fontSize,
    lineHeight: typography.bodyText.lineHeight,
    fontWeight: typography.bodyText.fontWeight,
    letterSpacing: typography.bodyText.letterSpacing,
    textAlign: 'center',
  },
});
