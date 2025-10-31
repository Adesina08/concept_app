import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "@components/Screen";
import Card from "@components/Card";
import SectionHeader from "@components/SectionHeader";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const distribution = [
  { label: "5", value: 30 },
  { label: "4", value: 25 },
  { label: "3", value: 20 },
  { label: "2", value: 15 },
  { label: "1", value: 10 }
];

const bulletSections = [
  {
    title: "Strengths",
    icon: "•",
    items: [
      "User-Centric Approach",
      "Innovative Concept",
      "Market Validation"
    ]
  },
  {
    title: "Weaknesses",
    icon: "•",
    items: [
      "Implementation Details",
      "Market Validation"
    ]
  },
  {
    title: "Improvement Areas",
    icon: "•",
    items: [
      "Elaborate on implementation",
      "Include market research data"
    ]
  }
];

const aiSuggestions = [
  "Add a section detailing the technical requirements.",
  "Include market research data to support projections.",
  "Clarify timeline for prototype testing."
];

const ConceptAnalysisScreen = () => {
  return (
    <Screen>
      <Text style={styles.title}>Concept Analysis</Text>

      <Card style={styles.ratingCard}>
        <View style={styles.ratingHeader}>
          <View>
            <Text style={styles.ratingScore}>4.2</Text>
            <Text style={styles.ratingLabel}>Overall Assessment</Text>
            <Text style={styles.ratingSubtitle}>Based on 1,265 reviews</Text>
          </View>
          <View>
            {distribution.map((item) => (
              <View key={item.label} style={styles.distributionRow}>
                <Text style={styles.distributionLabel}>{item.label}</Text>
                <View style={styles.distributionBar}>
                  <View style={[styles.distributionFill, { width: `${item.value}%` }]} />
                </View>
                <Text style={styles.distributionPercent}>{item.value}%</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>

      {bulletSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <SectionHeader title={section.title} />
          <Card>
            {section.items.map((item) => (
              <Text key={item} style={styles.bullet}>• {item}</Text>
            ))}
          </Card>
        </View>
      ))}

      <SectionHeader title="AI Revision Suggestions" />
      <Card>
        <Text style={styles.sectionDescription}>
          Based on the analysis, the AI suggests the following revisions:
        </Text>
        {aiSuggestions.map((suggestion) => (
          <Text key={suggestion} style={styles.bullet}>• {suggestion}</Text>
        ))}
        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reject Revisions</Text>
          </View>
          <View style={[styles.actionButton, styles.primaryAction]}>
            <Text style={[styles.actionButtonText, styles.primaryActionText]}>Apply Revisions</Text>
          </View>
        </View>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg
  },
  ratingCard: {
    marginBottom: spacing.xl,
    gap: spacing.lg
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.lg
  },
  ratingScore: {
    fontSize: 48,
    fontWeight: "700",
    color: colors.text
  },
  ratingLabel: {
    color: colors.text,
    fontWeight: "600"
  },
  ratingSubtitle: {
    color: colors.muted,
    marginTop: spacing.xs
  },
  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm
  },
  distributionLabel: {
    width: 18,
    color: colors.muted
  },
  distributionBar: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden"
  },
  distributionFill: {
    flex: 1,
    backgroundColor: colors.primary
  },
  distributionPercent: {
    width: 40,
    textAlign: "right",
    color: colors.muted
  },
  section: {
    marginBottom: spacing.xl
  },
  bullet: {
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 20
  },
  sectionDescription: {
    color: colors.muted,
    marginBottom: spacing.md
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    alignItems: "center"
  },
  actionButtonText: {
    color: colors.text,
    fontWeight: "600"
  },
  primaryAction: {
    backgroundColor: colors.primary,
    borderColor: "transparent"
  },
  primaryActionText: {
    color: colors.text
  }
});

export default ConceptAnalysisScreen;
