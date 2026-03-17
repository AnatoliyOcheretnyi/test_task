import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { palette, radius, spacing } from '@/shared/theme/tokens';

type PageIndicatorProps = {
  total: number;
  progress: SharedValue<number>;
  mode?: keyof typeof palette;
};

function IndicatorDot({
  index,
  progress,
  mode,
}: {
  index: number;
  progress: SharedValue<number>;
  mode: keyof typeof palette;
}) {
  const theme = palette[mode];
  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [index - 1, index, index + 1], [6, 6, 6], Extrapolation.CLAMP),
    height: interpolate(progress.value, [index - 1, index, index + 1], [6, 18, 6], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [index - 1, index, index + 1], [0.4, 1, 0.4], Extrapolation.CLAMP),
    backgroundColor: interpolateColor(
      progress.value,
      [index - 1, index, index + 1],
      [theme.stepperInactive, theme.stepperActive, theme.stepperInactive],
    ),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export function PageIndicator({ total, progress, mode = 'light' }: PageIndicatorProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => (
        <IndicatorDot index={index} key={index} mode={mode} progress={progress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    borderRadius: radius.pill,
  },
});
