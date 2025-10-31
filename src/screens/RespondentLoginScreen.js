import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Screen from "@components/Screen";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const RespondentLoginScreen = () => {
  return (
    <Screen>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Respondent Login</Text>

      <TextInput placeholder="Email or Username" placeholderTextColor={colors.muted} style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor={colors.muted} secureTextEntry style={styles.input} />

      <TouchableOpacity>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Don't have an account?</Text>
      <TouchableOpacity>
        <Text style={styles.footerLink}>Sign Up</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl
  },
  backIcon: {
    color: colors.text,
    fontSize: 18
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xxl
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    marginBottom: spacing.md
  },
  link: {
    color: colors.primary,
    fontWeight: "500",
    marginBottom: spacing.lg
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: spacing.xl
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },
  footerText: {
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.xs
  },
  footerLink: {
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default RespondentLoginScreen;
