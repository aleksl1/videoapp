import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChannelInfoProps {
  icon: ReactNode;
  channelName: string;
  iconBackgroundColor?: string;
  textColor?: string;
}

export default function ChannelInfo({
  icon,
  channelName,
  iconBackgroundColor = COLORS.primary,
  textColor = COLORS.primary,
}: ChannelInfoProps) {
  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        {icon}
      </View>
      <Text style={[styles.channelName, { color: textColor }]}>
        {channelName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  channelName: {
    ...fontConfig.md,
  },
});

