// Theme and styling constants
import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#8D99AE",
  primary: "#2B2D42",
  white: "#FFFFFF",
  outline: "#C8C8C8",
  black: "#000000",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 64,
  xxxl: 96,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 13,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
} as const;

export const BORDER_RADIUS = {
  md: 16,
} as const;

export const fontConfig = StyleSheet.create({
  xxl: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: FONT_SIZES.xxl,
    lineHeight: 24,
    letterSpacing: 1,
  },
  md: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
    letterSpacing: 1,
  },
  md_light_weight: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
    letterSpacing: 1,
  },
  sm: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: FONT_SIZES.sm,
    lineHeight: 16,
    letterSpacing: 0,
  },
  xs: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: FONT_SIZES.xs,
    lineHeight: 24,
    letterSpacing: 1,
  },
});
