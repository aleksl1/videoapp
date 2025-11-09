import {
  BORDER_RADIUS,
  COLORS,
  fontConfig,
  SPACING,
} from "@/src/constants/theme";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
}

export default function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: COLORS.white,
    ...fontConfig.md,
  },
});
