import { memo } from "react";
import { StyleSheet, Text } from "react-native";

import { palette, typography } from "@/shared/theme/tokens";
import { text } from "@/text";

type SignupTermsTextProps = {
  mode?: keyof typeof palette;
  onOpenLink: () => void;
};

function SignupTermsTextComponent({
  mode = "light",
  onOpenLink,
}: SignupTermsTextProps) {
  const theme = palette[mode];

  return (
    <Text style={[styles.termsText, { color: theme.textPrimary }]}>
      {text.signup.terms.prefix}
      <Text
        onPress={onOpenLink}
        style={[styles.linkText, { color: theme.buttonPrimary }]}
      >
        {text.signup.terms.termsOfService}
      </Text>
      <Text
        onPress={onOpenLink}
        style={[styles.linkText, { color: theme.buttonPrimary }]}
      >
        {text.signup.terms.and}
      </Text>
      <Text
        onPress={onOpenLink}
        style={[styles.linkText, { color: theme.buttonPrimary }]}
      >
        {text.signup.terms.privacyPolicy}
      </Text>
    </Text>
  );
}

export const SignupTermsText = memo(SignupTermsTextComponent);

const styles = StyleSheet.create({
  termsText: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: typography.bodySmall.fontWeight,
    letterSpacing: typography.bodySmall.letterSpacing,
  },
  linkText: {
    fontWeight: "500",
  },
});
