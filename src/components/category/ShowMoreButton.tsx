import { fontConfig } from "@/src/constants/theme";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

export default function ShowMoreButton(props: PressableProps) {
  return (
    <Pressable {...props}>
      <Text style={styles.text}>Show more</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    textDecorationLine: "underline",
    ...fontConfig.xs,
  },
});
