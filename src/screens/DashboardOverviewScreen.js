import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Screen from "@components/Screen";
import Card from "@components/Card";
import ProgressBar from "@components/ProgressBar";
import SectionHeader from "@components/SectionHeader";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const summaryMetrics = [
  { label: "Active Concepts", value: "5" },
  { label: "Survey Responses", value: "234" },
  { label: "A/B Tests", value: "3" }
];

const activeConcepts = [
  { id: "1", title: "Concept A: Eco-Friendly Packaging", progress: 75 },
  { id: "2", title: "Concept B: Sustainable Materials", progress: 50 },
  { id: "3", title: "Concept C: Reduced Waste", progress: 25 }
];

const quickLinks = [
  { id: "analysis", label: "Concept Analysis", icon: "bar-chart-2", route: "ConceptAnalysis" },
  { id: "refinement", label: "Refinement Results", icon: "sliders", route: "ConceptRefinement" },
  { id: "feedback", label: "Feedback Summary", icon: "message-circle", route: "FeedbackSummary" },
  { id: "evolution", label: "Concept Evolution", icon: "layers", route: "ConceptEvolution" }
];

const DashboardOverviewScreen = () => {
  const navigation = useNavigation();

  const renderMetric = ({ label, value }) => (
    <Card key={label} style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );

  const renderConcept = ({ item }) => (
    <Card style={styles.conceptCard} padded={false}>
      <View style={styles.conceptContent}>
        <View style={styles.conceptIcon}>
          <Feather name="image" size={22} color={colors.text} />
        </View>
        <View style={styles.conceptInfo}>
          <Text style={styles.conceptTitle}>{item.title}</Text>
          <View style={styles.progressRow}>
            <ProgressBar progress={item.progress} />
            <Text style={styles.progressText}>{item.progress}% Complete</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderQuickLink = (link) => (
    <TouchableOpacity key={link.id} style={styles.quickLink} onPress={() => navigation.navigate(link.route)}>
      <Feather name={link.icon} size={18} color={colors.text} />
      <Text style={styles.quickLinkText}>{link.label}</Text>
      <Feather name="chevron-right" size={18} color={colors.muted} style={styles.quickLinkIcon} />
    </TouchableOpacity>
  );

  return (
    <Screen>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Summary</Text>
      <View style={styles.metricsRow}>{summaryMetrics.map(renderMetric)}</View>

      <SectionHeader title="Active Concepts" />
      <FlatList
        data={activeConcepts}
        keyExtractor={(item) => item.id}
        renderItem={renderConcept}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />

      <SectionHeader title="Explore" />
      <View style={styles.quickLinkContainer}>{quickLinks.map(renderQuickLink)}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  sectionTitle: {
    color: colors.muted,
    marginBottom: spacing.sm,
    fontWeight: "600"
  },
  metricsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  metricCard: {
    flex: 1,
    alignItems: "flex-start",
    gap: spacing.xs
  },
  metricValue: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text
  },
  metricLabel: {
    color: colors.muted
  },
  conceptCard: {
    borderRadius: 18
  },
  conceptContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg
  },
  conceptIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center"
  },
  conceptInfo: {
    flex: 1,
    gap: spacing.sm
  },
  conceptTitle: {
    color: colors.text,
    fontWeight: "600"
  },
  progressRow: {
    gap: spacing.xs
  },
  progressText: {
    color: colors.muted,
    fontSize: 12
  },
  quickLinkContainer: {
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  quickLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  quickLinkText: {
    flex: 1,
    marginLeft: spacing.md,
    color: colors.text,
    fontWeight: "500"
  },
  quickLinkIcon: {
    marginLeft: spacing.sm
  }
});

export default DashboardOverviewScreen;
