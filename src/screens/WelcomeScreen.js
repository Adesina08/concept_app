import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "@components/Screen";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const goToDashboard = () => navigation.navigate("Main");
  const goToRespondent = () => navigation.navigate("RespondentLogin");

  return (
    <Screen>
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>ConceptForge</Text>
        <Text style={styles.welcome}>Welcome back</Text>
      </View>

      <View style={styles.form}>
        <TextInput placeholder="Enter your email or username" placeholderTextColor={colors.muted} style={styles.input} />
        <TextInput placeholder="Enter your password" placeholderTextColor={colors.muted} secureTextEntry style={styles.input} />
        <TouchableOpacity>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={goToDashboard}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? <Text style={styles.footerLink}>Sign up</Text></Text>
        <TouchableOpacity onPress={goToRespondent}>
          <Text style={styles.secondaryLink}>Log in as respondent</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl
  },
  brand: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text
  },
  welcome: {
    marginTop: spacing.sm,
    fontSize: 18,
    color: colors.muted
  },
  form: {
    gap: spacing.md
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text
  },
  link: {
    color: colors.primary,
    textAlign: "right",
    fontWeight: "500"
  },
  primaryButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: "center"
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },
  footer: {
    marginTop: spacing.xxl,
    alignItems: "center",
    gap: spacing.sm
  },
  footerText: {
    color: colors.muted
  },
  footerLink: {
    color: colors.text,
    fontWeight: "600"
  },
  secondaryLink: {
    color: colors.primary,
    fontWeight: "600"
  }
});

export default WelcomeScreen;
