import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "@theme/colors";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${Math.min(Math.max(progress, 0), 100)}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden"
  },
  fill: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 999
  }
});

export default ProgressBar;
