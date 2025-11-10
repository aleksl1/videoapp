import { text } from "@/assets/text/text";
import {
  BORDER_RADIUS,
  COLORS,
  fontConfig,
  SPACING,
} from "@/src/constants/theme";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import ClearIcon from "../icons/ClearIcon";
import SearchIcon from "../icons/SearchIcon";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
  editable?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onClear,
  editable = true,
}: SearchBarProps) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChangeText("");
    }
  };

  return (
    <View style={styles.container} pointerEvents={editable ? "auto" : "none"}>
      <View style={styles.innerContainer}>
        <SearchIcon height={24} width={24} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder={text.search_bar_placeholder}
          returnKeyType="search"
          placeholderTextColor={COLORS.outline}
          editable={editable}
        />
        {value.length > 0 && editable && (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            style={styles.clearButton}
          >
            <ClearIcon height={20} width={20} stroke={COLORS.outline} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 44,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  input: {
    flex: 1,
    paddingStart: SPACING.sm,
    paddingTop: 0,
    paddingBottom: SPACING.xs,
    includeFontPadding: false,
    ...fontConfig.md_light_weight,
  },
  clearButton: {
    padding: SPACING.xs,
  },
});
