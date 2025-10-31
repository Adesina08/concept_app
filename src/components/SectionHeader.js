import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const SectionHeader = ({ title, action }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text
  }
});

export default SectionHeader;
