import Button from "@/src/components/common/Button";
import AppIcon from "@/src/components/icons/AppIcon";
import Logo from "@/src/components/icons/Logo";
import { COLORS, fontConfig, SPACING } from "@/src/constants/theme";
import { router } from "expo-router";
import { Linking, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const handleGuestLogin = () => router.push("/(tabs)");

  return (
    <View style={styles.container}>
      <Logo />
      <AppIcon />
      <View style={styles.footerContainer}>
        <Text style={styles.welcomeText}>
          Welcome to the best YouTube-based learning application.
        </Text>
        <Button title="Log in as guest" onPress={handleGuestLogin} />
        <View>
          <Text style={styles.footerText}>By continuing, you agree with </Text>
          <Text style={styles.footerText}>
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              Terms and Conditions
            </Text>
            {" and "}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    justifyContent: "space-evenly",
  },
  welcomeText: {
    color: COLORS.white,
    ...fontConfig.xxl,
  },
  footerContainer: {
    gap: SPACING.xl,
  },
  footerText: {
    ...fontConfig.md,
    color: COLORS.white,
    textAlign: "center",
  },
  linkText: {
    ...fontConfig.md,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});
