import { Stack } from "expo-router";
import { QueryProvider } from "@/src/providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: "Settings" }}
        />
        <Stack.Screen name="video/[id]" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  );
}
