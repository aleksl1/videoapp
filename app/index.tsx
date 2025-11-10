import { text } from "@/assets/text/text";
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
        <Text style={styles.welcomeText}>{text.login_screen_welcome_text}</Text>
        <Button
          title={text.login_screen_guest_button_text}
          onPress={handleGuestLogin}
        />
        <View>
          <Text style={styles.footerText}>
            {`${text.login_screen_footer_text} `}
          </Text>
          <Text style={styles.footerText}>
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              {text.login_screen_footer_terms_of_service_text}
            </Text>
            {` ${text.login_screen_footer_and_text} `}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              {text.login_screen_footer_privacy_policy_text}
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
