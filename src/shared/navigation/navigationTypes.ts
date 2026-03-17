import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AuthRoutes {
  ONBOARDING = 'Onboarding',
  SIGNUP = 'Signup',
}

export type AuthStackParamList = {
  [AuthRoutes.ONBOARDING]: undefined;
  [AuthRoutes.SIGNUP]: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export enum AppRoutes {
  ACCOUNT = 'Account',
}

export type AppStackParamList = {
  [AppRoutes.ACCOUNT]: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export enum RootRoutes {
  AUTH = 'Auth',
  APP = 'App',
}

export type RootStackParamList = {
  [RootRoutes.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [RootRoutes.APP]: NavigatorScreenParams<AppStackParamList>;
};
