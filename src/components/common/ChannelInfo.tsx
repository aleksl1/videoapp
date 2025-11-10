import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface ChannelInfoProps {
  icon: ReactNode;
  channelName: string;
  iconBackgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

export default function ChannelInfo({
  icon,
  channelName,
  iconBackgroundColor = COLORS.primary,
  textColor = COLORS.primary,
  style,
}: ChannelInfoProps) {
  return (
    <View style={[styles.container, style]}>
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
    gap: SPACING.md,
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
