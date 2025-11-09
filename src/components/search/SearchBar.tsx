import { text } from "@/assets/text/text";
import {
  BORDER_RADIUS,
  COLORS,
  fontConfig,
  SPACING,
} from "@/src/constants/theme";
import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "../icons/SearchIcon";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  RightIcon?: React.ReactNode;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  RightIcon,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SearchIcon height={18} width={18} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder={text.search_bar_placeholder}
          returnKeyType="search"
          placeholderTextColor={COLORS.outline}
        />
      </View>
      {RightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  input: {
    flex: 1,
    paddingStart: SPACING.md,
    ...fontConfig.md,
  },
});
