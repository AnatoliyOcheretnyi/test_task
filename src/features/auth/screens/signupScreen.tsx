import { useCallback } from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";

import { SignupTermsText } from "@/features/auth/components";
import { useSignup } from "@/features/auth/hooks";
import { Button, Checkbox, ErrorState, Input, LoadingOverlay, Screen } from '@/shared/components';
import { useAppTheme } from '@/shared/providers';
import { palette, spacing, typography } from "@/shared/theme/tokens";
import { text } from "@/text";

const EXAMPLE_LINK = "https://example.com";

export default function SignupScreen() {
  const { mode } = useAppTheme();
  const theme = palette[mode];
  const {
    dismissSubmitError,
    errors,
    handleSubmit,
    loadingMessage,
    secureEntry,
    submitError,
    submitting,
    toggleAcceptedTerms,
    toggleSecureEntry,
    updateEmail,
    updateName,
    updatePassword,
    values,
  } = useSignup();

  const handleOpenExampleLink = useCallback(() => {
    void Linking.openURL(EXAMPLE_LINK);
  }, []);

  return (
    <Screen mode={mode}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.titlePrimary }]}>
            {text.signup.title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {text.signup.subtitle}
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            autoCapitalize="words"
            error={errors.name}
            label={text.signup.fields.name}
            mode={mode}
            onChangeText={updateName}
            placeholder={text.signup.placeholders.name}
            value={values.name}
          />
          <Input
            error={errors.email}
            keyboardType="email-address"
            label={text.signup.fields.email}
            mode={mode}
            onChangeText={updateEmail}
            placeholder={text.signup.placeholders.email}
            value={values.email}
          />
          <Input
            error={errors.password}
            label={text.signup.fields.password}
            mode={mode}
            onChangeText={updatePassword}
            onToggleSecureEntry={toggleSecureEntry}
            placeholder={text.signup.placeholders.password}
            secureTextEntry={secureEntry}
            value={values.password}
          />

          <Checkbox
            checked={values.acceptedTerms}
            error={errors.acceptedTerms}
            mode={mode}
            onPress={toggleAcceptedTerms}
            label={<SignupTermsText mode={mode} onOpenLink={handleOpenExampleLink} />}
          />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textPrimary }]}>
            {text.signup.footer.prefix}
            <Text
              onPress={handleOpenExampleLink}
              style={[styles.linkText, { color: theme.buttonPrimary }]}
            >
              {text.signup.footer.action}
            </Text>
          </Text>
          <Button
            label={text.signup.actions.createAccount}
            loading={submitting}
            mode={mode}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
      <ErrorState
        description={text.signup.errors.createAccountDescription}
        dismissLabel={text.common.close}
        mode={mode}
        onDismiss={dismissSubmitError}
        presentation="overlay"
        title={text.signup.errors.createAccountTitle}
        visible={Boolean(submitError) && !submitting}
      />
      <LoadingOverlay
        message={loadingMessage}
        mode={mode}
        visible={submitting}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: 20,
    paddingTop: 28,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.titleH1.fontSize,
    lineHeight: typography.titleH1.lineHeight,
    fontWeight: typography.titleH1.fontWeight,
    letterSpacing: typography.titleH1.letterSpacing,
  },
  subtitle: {
    fontSize: typography.bodyText.fontSize,
    lineHeight: typography.bodyText.lineHeight,
    fontWeight: typography.bodyText.fontWeight,
    letterSpacing: typography.bodyText.letterSpacing,
  },
  form: {
    gap: 14,
  },
  linkText: {
    fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
    gap: spacing.lg,
    paddingBottom: 8,
  },
  footerText: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: typography.bodySmall.fontWeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: palette.light.textPrimary,
    textAlign: "center",
  },
});
