import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Screen from "@components/Screen";
import Card from "@components/Card";
import SectionHeader from "@components/SectionHeader";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const insights = [
  { icon: "smile", label: "User Satisfaction", value: "85%" },
  { icon: "star", label: "Concept Preference", value: "72%" },
  { icon: "activity", label: "Average Rating", value: "4.8/5" }
];

const ConceptRefinementScreen = () => {
  return (
    <Screen>
      <Text style={styles.title}>Concept Refinement Results</Text>

      <Card style={styles.heroCard} padded={false}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80" }}
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>Top Concept</Text>
          <Text style={styles.heroTitle}>AI-Powered Personal Finance Advisor</Text>
          <Text style={styles.heroDescription}>
            A personalized financial planning tool that leverages AI to provide tailored investment strategies and budgeting advice.
          </Text>
        </View>
      </Card>

      <SectionHeader title="Key Insights" />
      <View style={styles.insightGrid}>
        {insights.map((item) => (
          <Card key={item.label} style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Feather name={item.icon} size={22} color={colors.primary} />
            </View>
            <Text style={styles.insightLabel}>{item.label}</Text>
            <Text style={styles.insightValue}>{item.value}</Text>
          </Card>
        ))}
      </View>

      <SectionHeader title="Download Summary" />
      <TouchableOpacity style={styles.downloadButton}>
        <Feather name="download" size={18} color={colors.text} />
        <Text style={styles.downloadText}>Download White Paper</Text>
      </TouchableOpacity>
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
  heroCard: {
    overflow: "hidden",
    borderRadius: 24,
    marginBottom: spacing.xl
  },
  heroImage: {
    width: "100%",
    height: 220
  },
  heroContent: {
    padding: spacing.lg,
    gap: spacing.sm
  },
  heroLabel: {
    color: colors.muted,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  heroDescription: {
    color: colors.muted,
    lineHeight: 20
  },
  insightGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  insightCard: {
    flex: 1,
    alignItems: "flex-start",
    gap: spacing.sm
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center"
  },
  insightLabel: {
    color: colors.muted
  },
  insightValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600"
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl
  },
  downloadText: {
    color: colors.text,
    fontWeight: "600"
  }
});

export default ConceptRefinementScreen;
