import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Screen from "@components/Screen";
import Card from "@components/Card";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

const profileOptions = [
  {
    title: "Account",
    items: ["Edit Profile", "Change Password", "Notifications"]
  },
  {
    title: "Support",
    items: ["Help Center", "Contact Us"]
  }
];

const ProfileScreen = () => {
  return (
    <Screen>
      <Card style={styles.profileCard}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sophia Carter</Text>
        <Text style={styles.role}>Client</Text>
        <Text style={styles.meta}>Joined 2022</Text>
      </Card>

      {profileOptions.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Card style={styles.optionCard} padded={false}>
            {section.items.map((item, index) => (
              <View key={item} style={[styles.optionRow, index < section.items.length - 1 && styles.optionDivider]}>
                <Text style={styles.optionText}>{item}</Text>
                <Text style={styles.optionChevron}>›</Text>
              </View>
            ))}
          </Card>
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
    marginBottom: spacing.xxl
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: spacing.sm
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700"
  },
  role: {
    color: colors.muted,
    fontWeight: "600"
  },
  meta: {
    color: colors.muted
  },
  section: {
    marginBottom: spacing.xl
  },
  sectionTitle: {
    color: colors.muted,
    marginBottom: spacing.sm,
    fontWeight: "600"
  },
  optionCard: {
    borderRadius: 18
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  optionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  optionText: {
    color: colors.text,
    fontSize: 16
  },
  optionChevron: {
    color: colors.muted,
    fontSize: 26
  }
});

export default ProfileScreen;
