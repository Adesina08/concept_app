import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Screen from "@components/Screen";
import Card from "@components/Card";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const SubmitConceptScreen = () => {
  return (
    <Screen>
      <Text style={styles.title}>Submit your concept</Text>

      <View style={styles.form}>
        <TextInput placeholder="Concept Title" placeholderTextColor={colors.muted} style={styles.input} />
        <TextInput
          placeholder="Concept Description"
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.multiline]}
          multiline
          numberOfLines={4}
        />

        <Card style={styles.uploadCard} padded={false}>
          <View style={styles.uploadContent}>
            <Feather name="upload-cloud" size={32} color={colors.muted} />
            <Text style={styles.uploadTitle}>Drag and drop or browse</Text>
            <Text style={styles.uploadSubtitle}>Upload images, documents, or other files related to your concept.</Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Files</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xl
  },
  form: {
    gap: spacing.lg
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    color: colors.text
  },
  multiline: {
    height: 140,
    textAlignVertical: "top"
  },
  uploadCard: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(19, 27, 46, 0.6)"
  },
  uploadContent: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text
  },
  uploadSubtitle: {
    color: colors.muted,
    textAlign: "center"
  },
  browseButton: {
    marginTop: spacing.sm,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  browseButtonText: {
    color: colors.text,
    fontWeight: "600"
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: "center",
    marginTop: spacing.sm
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  }
});

export default SubmitConceptScreen;
