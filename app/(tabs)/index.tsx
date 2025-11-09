import CategoryList from "@/src/components/category/CategoryList";
import SettingsIcon from "@/src/components/icons/SettingsIcon";
import SearchBar from "@/src/components/search/SearchBar";
import { VIDEO_CATEGORIES } from "@/src/constants/categories";
import { COLORS, SPACING } from "@/src/constants/theme";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <View style={styles.container}>
      <View
        style={styles.searchHeader}
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        <SearchBar
          value=""
          onChangeText={() => {}}
          onSubmit={() => {}}
          RightIcon={<SettingsIcon height={32} width={32} />}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: headerHeight + SPACING.md + SPACING.xl },
        ]}
      >
        {VIDEO_CATEGORIES?.map((category) => (
          <CategoryList
            key={category}
            category={category}
            videos={[
              {
                id: "1",
                title: "Video 1",
                thumbnailUrl: "https://via.placeholder.com/150",
                channelTitle: "Sample Channel",
                publishedAt: "2023-10-01T00:00:00Z",
              },
              {
                id: "2",
                title: "Video 2",
                thumbnailUrl: "https://via.placeholder.com/150",
                channelTitle: "Another Channel",
                publishedAt: "2023-10-02T00:00:00Z",
              },
            ]}
          />
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
    paddingTop: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
    paddingTop: SPACING.xl,
  },
});
