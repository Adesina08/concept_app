import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const Screen = ({ children, padded = true, scrollable = true, contentStyle }) => {
  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { contentContainerStyle: [styles.content, padded && styles.padded, contentStyle] }
    : { style: [styles.content, padded && styles.padded, contentStyle] };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container {...containerProps}>{children}</Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background
  },
  padded: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl
  }
});

export default Screen;
