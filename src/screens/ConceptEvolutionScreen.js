import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "@components/Screen";
import Card from "@components/Card";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const versions = [
  { version: "Version 3.0", date: "2024-03-15" },
  { version: "Version 2.0", date: "2024-03-10" },
  { version: "Version 1.0", date: "2024-03-05" }
];

const ConceptEvolutionScreen = () => {
  return (
    <Screen>
      <Text style={styles.title}>Concept Evolution</Text>
      <View style={styles.list}>
        {versions.map((item) => (
          <Card key={item.version} padded={false} style={styles.versionCard}>
            <TouchableOpacity style={styles.versionRow}>
              <View>
                <Text style={styles.versionTitle}>{item.version}</Text>
                <Text style={styles.versionDate}>{item.date}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xl
  },
  list: {
    gap: spacing.md
  },
  versionCard: {
    borderRadius: 18
  },
  versionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg
  },
  versionTitle: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 16
  },
  versionDate: {
    color: colors.muted,
    marginTop: spacing.xs
  },
  chevron: {
    fontSize: 32,
    color: colors.muted
  }
});

export default ConceptEvolutionScreen;
