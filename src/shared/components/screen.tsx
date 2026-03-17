import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { palette, spacing } from '@/shared/theme/tokens';

type ScreenProps = ViewProps & {
  mode?: keyof typeof palette;
};

export function Screen({ mode = 'light', style, ...props }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette[mode].background }]}>
      <View style={[styles.content, { backgroundColor: palette[mode].background }, style]} {...props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
