import CategoryList from "@/src/components/category/CategoryList";
import SettingsIcon from "@/src/components/icons/SettingsIcon";
import SearchBar from "@/src/components/search/SearchBar";
import { VIDEO_CATEGORIES } from "@/src/constants/categories";
import { COLORS, SPACING } from "@/src/constants/theme";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const searchBarHeight = 2 * SPACING.md + 24;
  const headerHeight = insets.top + searchBarHeight;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchHeader,
          { paddingTop: insets.top, paddingHorizontal: SPACING.xl },
        ]}
      >
        <View style={styles.searchRow}>
          <Pressable
            style={styles.searchPressable}
            onPress={() => router.push("/search")}
          >
            <SearchBar
              value=""
              onChangeText={() => {}}
              onSubmit={() => {}}
              editable={false}
            />
          </Pressable>
          <Pressable
            style={styles.settingsPressable}
            onPress={() => router.push("/settings")}
          >
            <SettingsIcon height={32} width={32} />
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: headerHeight + SPACING.md + SPACING.xl },
        ]}
      >
        {VIDEO_CATEGORIES?.map((category) => (
          <CategoryList key={category} category={category} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  searchHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: COLORS.white,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  searchPressable: {
    flex: 1,
  },
  settingsPressable: {
    padding: SPACING.sm,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
    paddingTop: SPACING.xl,
  },
});
