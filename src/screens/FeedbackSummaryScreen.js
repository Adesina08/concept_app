import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Screen from "@components/Screen";
import Card from "@components/Card";
import SectionHeader from "@components/SectionHeader";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const summaryStats = [
  { label: "Concepts Reviewed", value: "12" },
  { label: "Feedback Submissions", value: "25" },
  { label: "Points Earned", value: "150" }
];

const pendingFeedback = [
  { title: "Concept A", due: "Due: July 15", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=60" },
  { title: "Concept B", due: "Due: July 20", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=60" }
];

const FeedbackSummaryScreen = () => {
  return (
    <Screen>
      <Text style={styles.title}>Feedback Summary</Text>

      <View style={styles.summaryRow}>
        {summaryStats.map((stat) => (
          <Card key={stat.label} style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{stat.value}</Text>
            <Text style={styles.summaryLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      <SectionHeader title="Pending Feedback" />
      <View style={styles.pendingList}>
        {pendingFeedback.map((item) => (
          <Card key={item.title} style={styles.pendingCard} padded={false}>
            <View style={styles.pendingContent}>
              <Image source={{ uri: item.image }} style={styles.pendingImage} />
              <View style={styles.pendingInfo}>
                <Text style={styles.pendingTitle}>{item.title}</Text>
                <Text style={styles.pendingDue}>{item.due}</Text>
              </View>
              <Text style={styles.pendingChevron}>›</Text>
            </View>
          </Card>
        ))}
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
  summaryRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  summaryCard: {
    flex: 1,
    gap: spacing.xs
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text
  },
  summaryLabel: {
    color: colors.muted
  },
  pendingList: {
    gap: spacing.md
  },
  pendingCard: {
    borderRadius: 18
  },
  pendingContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.md
  },
  pendingImage: {
    width: 56,
    height: 56,
    borderRadius: 16
  },
  pendingInfo: {
    flex: 1,
    gap: spacing.xs
  },
  pendingTitle: {
    color: colors.text,
    fontWeight: "600"
  },
  pendingDue: {
    color: colors.muted,
    fontSize: 12
  },
  pendingChevron: {
    fontSize: 32,
    color: colors.muted,
    marginRight: spacing.sm
  }
});

export default FeedbackSummaryScreen;
