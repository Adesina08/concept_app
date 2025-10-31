import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Screen from "@components/Screen";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const ConceptFeedbackScreen = () => {
  return (
    <Screen>
      <Text style={styles.header}>Concept Feedback</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80" }}
          style={styles.image}
        />
      </View>

      <Text style={styles.instructions}>Swipe left if you dislike the concept, swipe right if you like it.</Text>

      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordIcon}>🎤</Text>
        <Text style={styles.recordText}>Record Feedback</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center"
  },
  imageWrapper: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl
  },
  image: {
    width: "100%",
    height: 260
  },
  instructions: {
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.xxl,
    lineHeight: 20
  },
  recordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: spacing.md,
    gap: spacing.sm
  },
  recordIcon: {
    fontSize: 18
  },
  recordText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 16
  }
});

export default ConceptFeedbackScreen;
