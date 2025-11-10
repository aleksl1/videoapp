import CategoryCardVertical from "@/src/components/category/CategoryCardVertical";
import SortModal, { SortOrder } from "@/src/components/common/SortModal";
import SearchBar from "@/src/components/search/SearchBar";
import { COLORS, fontConfig, SPACING } from "@/src/constants/theme";
import { useYouTubeSearch } from "@/src/hooks/useYouTubeSearch";
import { transformYouTubeVideos, VideoCardData } from "@/src/utils/youtube";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState(
    (params.category as string) || ""
  );
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  // Debounce search query - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use YouTube search hook with debounced query
  // Note: YouTube API doesn't support ascending date order, so we use "date" for both
  // and reverse the results on the frontend for "date-asc"
  const apiOrder = sortOrder === "date-asc" ? "date" : sortOrder;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useYouTubeSearch({
    query: debouncedQuery,
    maxResults: 10,
    order: apiOrder,
    enabled: debouncedQuery.length >= 3,
  });

  // Get total results from YouTube API
  const totalResults = useMemo(() => {
    return data?.pages[0]?.pageInfo?.totalResults ?? 0;
  }, [data]);

  // Transform and deduplicate videos
  const videos = useMemo(() => {
    if (!data?.pages) return [];

    const allVideos = data.pages.flatMap((page) =>
      transformYouTubeVideos(page.items)
    );

    // Deduplicate videos by ID
    const uniqueVideos = allVideos.filter(
      (video, index, self) => index === self.findIndex((v) => v.id === video.id)
    );

    // If sorting by oldest, reverse the array (YouTube API only supports newest first)
    if (sortOrder === "date-asc") {
      return [...uniqueVideos].reverse();
    }

    return uniqueVideos;
  }, [data, sortOrder]);

  // Handle category from params - immediately set both states
  useEffect(() => {
    if (params.category) {
      const categoryValue = params.category as string;
      setSearchQuery(categoryValue);
      setDebouncedQuery(categoryValue); // Set immediately for category params
    }
  }, [params.category]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    // Search is handled automatically by the query hook
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    // Clear category param from URL if it exists
    if (params.category) {
      router.setParams({ category: undefined });
    }
  }, [params.category, router]);

  const handleSortPress = useCallback(() => {
    setIsSortModalVisible(true);
  }, []);

  const handleSortConfirm = useCallback((order: SortOrder) => {
    setSortOrder(order);
  }, []);

  const getSortLabel = useCallback((order: SortOrder) => {
    switch (order) {
      case "relevance":
        return "Most popular";
      case "date":
        return "Upload date: Latest";
      case "date-asc":
        return "Upload date: Oldest";
      default:
        return "Most popular";
    }
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderVideoCard = useCallback(
    ({ item }: { item: VideoCardData }) => (
      <CategoryCardVertical
        video={item}
        onPress={() => {
          router.push(`/video/${item.id}`);
        }}
        style={styles.categoryCard}
      />
    ),
    [router]
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator
          size="small"
          color={COLORS.primary}
          testID="activity-indicator"
        />
      </View>
    );
  }, [isFetchingNextPage]);

  const HeaderComponent = () => (
    <View
      style={[styles.headerWrapper, { paddingTop: insets.top + SPACING.md }]}
    >
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onClear={handleClear}
        />
      </View>
      {debouncedQuery && debouncedQuery.length >= 3 && (
        <>
          <Text style={styles.resultsText}>
            {totalResults} results found for:{" "}
            <Text style={styles.resultsBold}>
              &ldquo;{debouncedQuery}&rdquo;
            </Text>
          </Text>
          <TouchableOpacity onPress={handleSortPress} activeOpacity={0.7}>
            <Text style={styles.sortText}>
              Sort by:{" "}
              <Text style={styles.sortBold}>{getSortLabel(sortOrder)}</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const emptyComponent = useMemo(() => {
    if (!searchQuery) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Enter a search term to find videos
          </Text>
        </View>
      );
    }

    if (searchQuery.length < 3) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Type at least 3 characters to search
          </Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>
            Failed to load videos. Please try again.
          </Text>
        </View>
      );
    }

    if (videos.length === 0 && !isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No results found for &ldquo;{debouncedQuery}&rdquo;
          </Text>
        </View>
      );
    }

    return null;
  }, [searchQuery, debouncedQuery, isError, videos.length, isLoading]);

  const keyExtractor = useCallback(
    (item: VideoCardData, index: number) => `${item.id}-${index}`,
    []
  );

  if (isLoading && !data) {
    return (
      <View style={styles.container}>
        <HeaderComponent />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList<VideoCardData>
        data={videos}
        renderItem={renderVideoCard}
        keyExtractor={keyExtractor}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
      <SortModal
        visible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
        currentOrder={sortOrder}
        onConfirm={handleSortConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  searchBarContainer: {
    height: 44,
    marginBottom: SPACING.sm,
  },
  resultsHeader: {
    paddingVertical: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsText: {
    ...fontConfig.xxs,
    color: COLORS.primary,
    flex: 1,
    textAlign: "left",
  },
  resultsBold: {
    ...fontConfig.xxs_semi_bold,
  },
  sortText: {
    ...fontConfig.xs,
    color: COLORS.primary,
    textAlign: "right",
  },
  sortBold: {
    ...fontConfig.xs_semi_bold,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    minHeight: 200,
  },
  emptyText: {
    ...fontConfig.md,
    color: COLORS.outline,
    textAlign: "center",
  },
  errorText: {
    ...fontConfig.md,
    color: COLORS.primary,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoader: {
    paddingVertical: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCard: {
    paddingHorizontal: SPACING.xl,
  },
});
