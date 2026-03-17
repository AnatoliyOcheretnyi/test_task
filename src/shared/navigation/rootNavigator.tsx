import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { OnboardingScreen, SignupScreen } from '@/features/auth/screens';
import { AccountScreen } from '@/features/profile/screens';
import { Screen } from '@/shared/components';
import { useAppSession, useAppTheme } from '@/shared/providers';
import { appThemes } from '@/shared/theme';
import { palette } from '@/shared/theme/tokens';
import type {
  AppStackParamList,
  AuthStackParamList,
  RootStackParamList,
} from '@/shared/navigation/navigationTypes';
import { AppRoutes, AuthRoutes, RootRoutes } from '@/shared/navigation/navigationTypes';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function BootstrapScreen() {
  return (
    <Screen mode="light" style={styles.bootstrapScreen}>
      <View style={styles.loader}>
        <ActivityIndicator color={palette.light.buttonPrimary} size="large" />
      </View>
    </Screen>
  );
}

type AuthStackNavigatorProps = {
  initialRouteName: AuthRoutes;
};

function AuthStackNavigator({ initialRouteName }: AuthStackNavigatorProps) {
  return (
    <AuthStack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <AuthStack.Screen component={OnboardingScreen} name={AuthRoutes.ONBOARDING} />
      <AuthStack.Screen component={SignupScreen} name={AuthRoutes.SIGNUP} />
    </AuthStack.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen component={AccountScreen} name={AppRoutes.ACCOUNT} />
    </AppStack.Navigator>
  );
}

export function RootNavigator() {
  const { mode } = useAppTheme();
  const { account, bootstrapped, hasSeenOnboarding } = useAppSession();
  const theme = appThemes[mode];
  const authInitialRoute = hasSeenOnboarding ? AuthRoutes.SIGNUP : AuthRoutes.ONBOARDING;

  if (!bootstrapped) {
    return (
      <ThemeProvider value={theme}>
        <BootstrapScreen />
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator screenOptions={{ animation: 'fade', headerShown: false }}>
        {account ? (
          <RootStack.Screen component={AppStackNavigator} name={RootRoutes.APP} />
        ) : (
          <RootStack.Screen name={RootRoutes.AUTH}>
            {() => <AuthStackNavigator initialRouteName={authInitialRoute} />}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bootstrapScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
