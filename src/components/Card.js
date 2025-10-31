import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const Card = ({ children, style, padded = true, ...props }) => {
  return (
    <View style={[styles.card, padded && styles.padded, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  padded: {
    padding: spacing.lg
  }
});

export default Card;
