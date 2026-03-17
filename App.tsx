import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppSessionProvider, AppThemeProvider } from '@/shared/providers';
import { RootNavigator } from '@/shared/navigation/rootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppThemeProvider>
        <AppSessionProvider>
          <RootNavigator />
        </AppSessionProvider>
      </AppThemeProvider>
    </GestureHandlerRootView>
  );
}
