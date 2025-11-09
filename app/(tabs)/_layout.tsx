import HomeIcon from "@/src/components/icons/HomeIcon";
import SearchIcon from "@/src/components/icons/SearchIcon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: () => <SearchIcon />,
        }}
      />
    </Tabs>
  );
}
