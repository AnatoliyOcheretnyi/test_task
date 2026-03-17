import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { palette, radius, shadow, spacing, typography } from '@/shared/theme/tokens';
import { Button } from '@/shared/components/button';

type ErrorStateProps = {
  title: string;
  description: string;
  mode?: keyof typeof palette;
  actionLabel?: string;
  onAction?: () => void;
  actionLoading?: boolean;
  visible?: boolean;
  presentation?: 'card' | 'overlay';
  onDismiss?: () => void;
  dismissLabel?: string;
};

function ErrorGlyph({ mode }: { mode: keyof typeof palette }) {
  const theme = palette[mode];
  const pulse = useSharedValue(0.92);
  const rotate = useSharedValue(-8);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.out(Easing.ease) }),
        withTiming(0.92, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    rotate.value = withRepeat(
      withSequence(
        withTiming(8, { duration: 220, easing: Easing.inOut(Easing.ease) }),
        withTiming(-6, { duration: 220, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 220, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [pulse, rotate]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.16 + (pulse.value - 0.92) * 1.4,
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.illustrationWrap}>
      <Animated.View
        style={[
          styles.glow,
          pulseStyle,
          { backgroundColor: theme.dangerSoft },
        ]}
      />
      <Animated.View
        style={[
          styles.badge,
          badgeStyle,
          { backgroundColor: theme.danger, shadowColor: theme.danger },
        ]}>
        <View style={styles.cross}>
          <View style={[styles.crossLine, styles.crossLineLeft]} />
          <View style={[styles.crossLine, styles.crossLineRight]} />
        </View>
      </Animated.View>
    </View>
  );
}

function ErrorContent({
  actionLabel,
  actionLoading = false,
  description,
  dismissLabel,
  mode = 'light',
  onAction,
  onDismiss,
  title,
}: Omit<ErrorStateProps, 'presentation' | 'visible'>) {
  const theme = palette[mode];

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <ErrorGlyph mode={mode} />
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>{description}</Text>
      </View>
      {actionLabel && onAction ? (
        <Button label={actionLabel} loading={actionLoading} mode={mode} onPress={onAction} />
      ) : null}
      {onDismiss ? (
        <Pressable onPress={onDismiss} style={styles.dismissButton}>
          <Text style={[styles.dismissLabel, { color: theme.titlePrimary }]}>{dismissLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function ErrorState({
  actionLabel,
  actionLoading = false,
  description,
  dismissLabel,
  mode = 'light',
  onAction,
  onDismiss,
  presentation = 'card',
  title,
  visible = true,
}: ErrorStateProps) {
  const theme = palette[mode];

  if (!visible) {
    return null;
  }

  if (presentation === 'overlay') {
    return (
      <View style={[styles.overlay, { backgroundColor: theme.modalOverlay }]}>
        <ErrorContent
          actionLabel={actionLabel}
          actionLoading={actionLoading}
          description={description}
          dismissLabel={dismissLabel}
          mode={mode}
          onAction={onAction}
          onDismiss={onDismiss}
          title={title}
        />
      </View>
    );
  }

  return (
    <ErrorContent
      actionLabel={actionLabel}
      actionLoading={actionLoading}
      description={description}
      dismissLabel={dismissLabel}
      mode={mode}
      onAction={onAction}
      onDismiss={onDismiss}
      title={title}
    />
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
  illustrationWrap: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: radius.pill,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  cross: {
    width: 18,
    height: 18,
  },
  crossLine: {
    position: 'absolute',
    top: 8,
    width: 18,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
  },
  crossLineLeft: {
    transform: [{ rotate: '45deg' }],
  },
  crossLineRight: {
    transform: [{ rotate: '-45deg' }],
  },
  textWrap: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: typography.bodyText.fontSize,
    lineHeight: typography.bodyText.lineHeight,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: typography.bodySmall.fontWeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    textAlign: 'center',
  },
  dismissButton: {
    paddingTop: 2,
  },
  dismissLabel: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: '600',
    letterSpacing: typography.bodySmall.letterSpacing,
  },
});
