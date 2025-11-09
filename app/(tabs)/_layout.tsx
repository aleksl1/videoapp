import HomeIcon from "@/src/components/icons/HomeIcon";
import SearchIcon from "@/src/components/icons/SearchIcon";
import { COLORS, fontConfig, SPACING } from "@/src/constants/theme";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
        },
        tabBarLabelStyle: {
          ...fontConfig.md_light_weight,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.white,
        tabBarItemStyle: {
          paddingTop: SPACING.xs,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              fill={focused ? COLORS.primary : COLORS.white}
              width={28}
              height={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              stroke={focused ? COLORS.primary : COLORS.white}
              width={28}
              height={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
