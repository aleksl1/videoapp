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
  xxs: 10,
  xs: 12,
  sm: 13,
  sm_medium: 15,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
} as const;

export const FONTS = {
  black: "Poppins-Black",
  blackItalic: "Poppins-BlackItalic",
  bold: "Poppins-Bold",
  boldItalic: "Poppins-BoldItalic",
  extraBold: "Poppins-ExtraBold",
  extraBoldItalic: "Poppins-ExtraBoldItalic",
  extraLight: "Poppins-ExtraLight",
  extraLightItalic: "Poppins-ExtraLightItalic",
  italic: "Poppins-Italic",
  light: "Poppins-Light",
  lightItalic: "Poppins-LightItalic",
  medium: "Poppins-Medium",
  mediumItalic: "Poppins-MediumItalic",
  regular: "Poppins-Regular",
  semiBold: "Poppins-SemiBold",
  semiBoldItalic: "Poppins-SemiBoldItalic",
  thin: "Poppins-Thin",
  thinItalic: "Poppins-ThinItalic",
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 16,
} as const;

export const fontConfig = StyleSheet.create({
  xxl: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.xxl,
    lineHeight: 24,
    letterSpacing: 1,
  },
  lg: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.lg,
    lineHeight: 24,
    letterSpacing: 1,
  },
  md: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
    letterSpacing: 1,
  },
  md_light_weight: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
    letterSpacing: 1,
  },
  sm_medium_compact: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm_medium,
    lineHeight: 12,
    letterSpacing: 1,
  },
  sm: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    lineHeight: 16,
    letterSpacing: 0,
  },
  xs: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.xs,
    lineHeight: 24,
    letterSpacing: 1,
  },
  xs_semi_bold: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.xs,
    lineHeight: 24,
    letterSpacing: 1,
  },
  xs_compact: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.xs,
    lineHeight: 12,
    letterSpacing: 1,
  },
  xxs: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.xxs,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: "center",
  },
  xxs_semi_bold: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.xxs,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: "center",
  },
});
