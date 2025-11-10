import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChipProps {
  icon?: ReactNode;
  label: string;
  value: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Chip({
  icon,
  label,
  value,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
}: ChipProps) {
  return (
    <View style={[styles.chip, { backgroundColor }]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[styles.value, { color: textColor }]}>{value}</Text>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    borderRadius: 12,
    padding: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },
  label: {
    ...fontConfig.sm,
  },
  value: {
    ...fontConfig.sm,
    fontWeight: "600",
  },
});
